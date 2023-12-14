import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  IconButton,
  Box,
  Tooltip,
} from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import { deleteRequestById } from "../features/apiCalls";
import { useNavigate } from "react-router-dom";

const StyledTableCell = ({ children }) => (
  <TableCell>
    <TableSortLabel>
      <b>{children}</b>
    </TableSortLabel>
  </TableCell>
);

const EnhancedTable = ({ data, onDelete }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const navigate = useNavigate();

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = (id) => {
    deleteRequestById(id)
      .then((response) => {
        if (response?.success) {
          console.log("Deleted request with ID:", id, response);
          onDelete(response.success, id);
        }
      })
      .catch((error) => {
        console.error("Error deleting request:", error);
      });
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  const handleSotProperties = (data) => {
    if (data && data.length > 0) {
      return (
        <React.Fragment>
          {JSON.parse(data).map((obj) => (
            <tr key={obj.tagKey}>
              <Tooltip title={obj.tagName} arrow>
                <td>{obj.tagKey}</td>
              </Tooltip>
              <td>:</td>
              <Tooltip title={obj.tagName} arrow>
                <td>{obj.tagName}</td>
              </Tooltip>
            </tr>
          ))}
        </React.Fragment>
      );
    } else {
      return (
        <tr key="no-stag-vars">
          <td colSpan="2">No Stag Variables Available.</td>
        </tr>
      );
    }
  };

  return (
    <Box width="80%" margin="0 auto">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell onClick={() => handleRequestSort("title")}>
                Title
              </StyledTableCell>
              <StyledTableCell onClick={() => handleRequestSort("description")}>
                Description
              </StyledTableCell>
              <StyledTableCell onClick={() => handleRequestSort("requestedBy")}>
                Requested By
              </StyledTableCell>
              <StyledTableCell onClick={() => handleRequestSort("sotType")}>
                SOT Type
              </StyledTableCell>
              <StyledTableCell>Stag Variables</StyledTableCell>
              <StyledTableCell onClick={() => handleRequestSort("platform")}>
                Platform
              </StyledTableCell>
              <StyledTableCell onClick={() => handleRequestSort("comments")}>
                Comments
              </StyledTableCell>
              <StyledTableCell>Attachments</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(({ id, title, description, requestedBy, sotType, sotProperties, platform, comments }) => (
              <TableRow key={id}>
                <Tooltip title={title} arrow>
                  <TableCell>{title}</TableCell>
                </Tooltip>
                <Tooltip title={description} arrow>
                  <TableCell>{description}</TableCell>
                </Tooltip>
                <Tooltip title={requestedBy} arrow>
                  <TableCell>{requestedBy}</TableCell>
                </Tooltip>
                <Tooltip title={sotType} arrow>
                  <TableCell>{sotType}</TableCell>
                </Tooltip>
                <TableCell>{handleSotProperties(sotProperties)}</TableCell>
                <Tooltip title={platform} arrow>
                  <TableCell>{platform}</TableCell>
                </Tooltip>
                <Tooltip title={comments} arrow>
                  <TableCell>{comments}</TableCell>
                </Tooltip>
                <TableCell>attachments</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <IconButton color="secondary" aria-label="edit" onClick={() => handleEdit(id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" aria-label="delete" onClick={() => handleDelete(id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EnhancedTable;
