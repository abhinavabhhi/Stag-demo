import React, { useState } from 'react';
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
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

const EnhancedTable = ({ data }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'title'}
                direction={order}
                onClick={() => handleRequestSort('title')}
              >
                Title
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'description'}
                direction={order}
                onClick={() => handleRequestSort('description')}
              >
                Description
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'requestedBy'}
                direction={order}
                onClick={() => handleRequestSort('requestedBy')}
              >
                Requested By
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotType'}
                direction={order}
                onClick={() => handleRequestSort('sotType')}
              >
                SOT Type
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar1'}
                direction={order}
                onClick={() => handleRequestSort('sotVar1')}
              >
                SOT Var1
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar2'}
                direction={order}
                onClick={() => handleRequestSort('sotVar2')}
              >
                SOT Var2
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar3'}
                direction={order}
                onClick={() => handleRequestSort('sotVar3')}
              >
                SOT Var3
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar4'}
                direction={order}
                onClick={() => handleRequestSort('sotVar4')}
              >
                SOT Var4
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar5'}
                direction={order}
                onClick={() => handleRequestSort('sotVar5')}
              >
                SOT Var5
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar6'}
                direction={order}
                onClick={() => handleRequestSort('sotVar6')}
              >
                SOT Var6
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar7'}
                direction={order}
                onClick={() => handleRequestSort('sotVar7')}
              >
                SOT Var7
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar8'}
                direction={order}
                onClick={() => handleRequestSort('sotVar8')}
              >
                SOT Var8
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar9'}
                direction={order}
                onClick={() => handleRequestSort('sotVar9')}
              >
                SOT Var9
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar10'}
                direction={order}
                onClick={() => handleRequestSort('sotVa10')}
              >
                SOT Var10
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar11'}
                direction={order}
                onClick={() => handleRequestSort('sotVar11')}
              >
                SOT Var11
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar12'}
                direction={order}
                onClick={() => handleRequestSort('sotVar12')}
              >
                SOT Var12
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar13'}
                direction={order}
                onClick={() => handleRequestSort('sotVar13')}
              >
                SOT Var13
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar14'}
                direction={order}
                onClick={() => handleRequestSort('sotVar14')}
              >
                SOT Var14
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar15'}
                direction={order}
                onClick={() => handleRequestSort('sotVar15')}
              >
                SOT Var15
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'sotVar16'}
                direction={order}
                onClick={() => handleRequestSort('sotVar16')}
              >
                SOT Var16
              </TableSortLabel>
            </TableCell>
            <TableCell>Platform</TableCell>
            <TableCell>Comments</TableCell>
            <TableCell>Attachments</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.requestedBy}</TableCell>
              <TableCell>{row.sotType}</TableCell>
              <TableCell>{row.sotVar1}</TableCell>
              <TableCell>{row.sotVar2}</TableCell>
              <TableCell>{row.sotVar3}</TableCell>
              <TableCell>{row.sotVar4}</TableCell>
              <TableCell>{row.sotVar5}</TableCell>
              <TableCell>{row.sotVar6}</TableCell>
              <TableCell>{row.sotVar7}</TableCell>
              <TableCell>{row.sotVar8}</TableCell>
              <TableCell>{row.sotVar9}</TableCell>
              <TableCell>{row.sotVar10}</TableCell>
              <TableCell>{row.sotVar11}</TableCell>
              <TableCell>{row.sotVar12}</TableCell>
              <TableCell>{row.sotVar13}</TableCell>
              <TableCell>{row.sotVar14}</TableCell>
              <TableCell>{row.sotVar15}</TableCell>
              <TableCell>{row.sotVar16}</TableCell>
              <TableCell>{row.platform}</TableCell>
              <TableCell>{row.comments}</TableCell>
              <TableCell>attachments</TableCell>
              {/* <TableCell>{imageLoad(row.attachments)}</TableCell> */}
              <TableCell>
                <IconButton color="secondary" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EnhancedTable;
