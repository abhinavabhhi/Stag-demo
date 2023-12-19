const INSERT_STAG_REQUEST = `INSERT INTO stagdemo.stag_request(requestId,title,description,requestedBy,sotType,sotProperties,sotVar1,sotVar2,sotVar3,sotVar4,sotVar5,sotVar6,sotVar7,sotVar8,sotVar9,sotVar10,sotVar11,sotVar12,sotVar13,sotVar14,sotVar15,sotVar16,platform,comments,attachments)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const UPLOAD_ATTACHMENTS = `INSERT INTO stagdemo.attachments(name,type,fileURL)VALUES(?, ?, ?)`;
const DELETE_STAG_REQUEST = "DELETE FROM stagdemo.stag_request WHERE id=?";
const GET_STAG_REQUEST_BY_ID = "SELECT * FROM stagdemo.stag_request WHERE id=?";
const GET_UPLOADED_ATTACCHMENTS = `SELECT * FROM stagdemo.attachments`;
const UPDATE_STAG_REQUEST = "UPDATE stagdemo.stag_request SET requestId = ?,title = ?,description = ?,requestedBy = ?,sotType = ?,sotProperties = ?,sotVar1 = ?,sotVar2 = ?,sotVar3 = ?,sotVar4 = ?,sotVar5 = ?,sotVar6 = ?,sotVar7 = ?,sotVar8 = ?,sotVar9 = ?,sotVar10 = ?,sotVar11 = ?,sotVar12 = ?,sotVar13 = ?,sotVar14 = ?,sotVar15 = ?,sotVar16 = ?,platform = ?,comments = ?,attachments = ? WHERE id = ?";
module.exports = {
  SELECT_ALL_STAG_REQUESTS: "SELECT * FROM stagdemo.stag_request",
  INSERT_STAG_REQUEST,
  UPLOAD_ATTACHMENTS,
  GET_UPLOADED_ATTACCHMENTS,
  DELETE_STAG_REQUEST,
  UPDATE_STAG_REQUEST,
  GET_STAG_REQUEST_BY_ID
};
