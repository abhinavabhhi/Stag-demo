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
import EditStagRequest from "./EditStagRequest";
import ModalContainer from "./ModalContainer";
import CarouselSlider from "./CarouselSlider";

const columnNames = [
  "Title",
  "Description",
  "Requested By",
  "SOT Type",
  "Stag Variables",
  "Platform",
  "Comments",
  "Attachments",
  "Actions",
];

const StyledTableCell = ({ children }) => (
  <TableCell>
    <TableSortLabel>
      <b>{children}</b>
    </TableSortLabel>
  </TableCell>
);

const initialModalState = {
  isOpen: false,
  content: null,
  text: "",
  title: "",
};

const EnhancedTable = ({ data, onDelete, onDataRefresh }) => {
  const TableHeader = () => {
    return (
      <>
        {columnNames.map((columnName, index) => (
          <StyledTableCell
            key={index}
            onClick={() => handleRequestSort(columnName.toLowerCase())}
          >
            {columnName}
          </StyledTableCell>
        ))}
      </>
    );
  };
  const handleRequestSort = (property) => {
    const isAsc = state.orderBy === property && state.order === "asc";
    setState((prevState) => ({
      ...prevState,
      order: isAsc ? "desc" : "asc",
      orderBy: property,
    }));
  };
  const [state, setState] = useState({
    order: "asc",
    orderBy: "id",
    modal: { ...initialModalState },
    selectedAttachments: [],
    attachmentsModalOpen: false,
  });

  const handleDelete = (id) => {
    deleteRequestById(id)
      .then((response) => {
        if (response?.success) {
          onDelete(response.success, id);
        }
      })
      .catch((error) => {
        console.error("Error deleting request:", error);
      });
  };

  const openModal = (text, title) => {
    setState((prevState) => ({
      ...prevState,
      modal: {
        isOpen: true,
        content: title,
        text,
        title,
      },
    }));
  };

  const onCloseModal = () => {
    setState((prevState) => ({
      ...prevState,
      modal: { ...initialModalState },
    }));
  };

  const handleEdit = (id) => {
    openModal(
      <EditStagRequest
        id={id}
        onClose={onCloseModal}
        onDataRefresh={onDataRefresh}
      />
    );
  };

  const handleAttachmentsClick = (attachments) => {
    setState((prevState) => ({
      ...prevState,
      selectedAttachments: attachments,
      attachmentsModalOpen: true,
    }));
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handleLargeTextClick = (formField, data) => {
    openModal(data, formField);
  };

  const handleSotProperties = (data) => {
    if (data && data.length > 0) {
      return JSON.parse(data).map((obj) => (
        <tr key={obj.tagKey}>
          <Tooltip title={obj.tagName} arrow>
            <td>{obj.tagKey}</td>
          </Tooltip>
          <td>:</td>
          <Tooltip title={obj.tagName} arrow>
            <td>{obj.tagName}</td>
          </Tooltip>
        </tr>
      ));
    } else {
      return (
        <tr key="no-stag-vars">
          <td colSpan="3">No Stag Variables Available.</td>
        </tr>
      );
    }
  };

  return (
    <Box width="98%" margin="0 auto">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(
              ({
                id,
                title,
                description,
                requestedBy,
                sotType,
                sotProperties,
                platform,
                comments,
                attachments,
              }) => (
                <TableRow key={id}>
                  <TableCell>{title}</TableCell>
                  <TableCell>
                    <span
                      onClick={() =>
                        handleLargeTextClick("Description", description)
                      }
                    >
                      {truncateText(description, 50)}
                      {description.length > 50 && (
                        <span style={{ color: "blue", cursor: "pointer" }}>
                          {" "}
                          (Show More)
                        </span>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>{requestedBy}</TableCell>
                  <TableCell>{sotType}</TableCell>
                  <TableCell>
                    {" "}
                    <table>
                      <tbody>{handleSotProperties(sotProperties)}</tbody>
                    </table>
                  </TableCell>
                  <TableCell>{platform}</TableCell>
                  <TableCell>
                    <span
                      onClick={() => handleLargeTextClick("Comments", comments)}
                    >
                      {truncateText(comments, 50)}
                      {comments.length > 50 && (
                        <span style={{ color: "blue", cursor: "pointer" }}>
                          {" "}
                          (Show More)
                        </span>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => handleAttachmentsClick(attachments)}
                    >
                      {attachments.length
                        ? `${attachments.length} attachments`
                        : `No Attachments`}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <IconButton
                        color="secondary"
                        aria-label="edit"
                        onClick={() => handleEdit(id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label="delete"
                        onClick={() => handleDelete(id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalContainer
        isOpen={state.modal.isOpen}
        onClose={onCloseModal}
        title={state.modal.title}
      >
        <div
          style={{
            padding:
              state.modal.title === "Description" ||
              state.modal.title === "Comments"
                ? "16px"
                : "0",
          }}
        >
          <strong>{state.modal.content}</strong>
          <p style={{ margin: "0" }}>{state.modal.text}</p>
        </div>
      </ModalContainer>
      <ModalContainer
        isOpen={state.attachmentsModalOpen}
        onClose={() =>
          setState((prevState) => ({
            ...prevState,
            attachmentsModalOpen: false,
          }))
        }
      >
        {state?.selectedAttachments?.length === 1 ? (
          <img
            src={state.selectedAttachments[0].src}
            alt="Attachment"
            style={{ width: "100%", marginBottom: "16px" }}
          />
        ) : (
          <CarouselSlider attachments={state.selectedAttachments} />
        )}
      </ModalContainer>
    </Box>
  );
};

export default EnhancedTable;
