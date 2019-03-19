import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import { getCurrentUser } from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" }
  ];

  likeColumn = {
    key: "like",
    content: movie => (
      <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
    )
  };

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-sm btn-danger"
      >
        <i className="fa fa-trash" aria-hidden="true" /> Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = getCurrentUser();
    if (user) {
      this.columns.push(this.likeColumn);
      if (user.isAdmin) this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
