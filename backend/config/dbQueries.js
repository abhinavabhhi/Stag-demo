const INSERT_STAG_REQUEST = `INSERT INTO stagdemo.stag_request(title,description,requestedBy,sotType,sotVar1,sotVar2,sotVar3,sotVar4,sotVar5,sotVar6,sotVar7,sotVar8,sotVar9,sotVar10,sotVar11,sotVar12,sotVar13,sotVar14,sotVar15,sotVar16,platform,comments,attachments)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
module.exports = {
  SELECT_ALL_STAG_REQUESTS: "SELECT * FROM stagdemo.stag_request",
  INSERT_STAG_REQUEST,
};
