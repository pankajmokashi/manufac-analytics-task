import { Table } from "@mantine/core";

const ShowTable = ({ col1, col2, col3, elements, tableData }) => {
  const rows = elements.map((element) => (
    <Table.Tr key={element[tableData[0]]}>
      <Table.Td>{element[tableData[0]]}</Table.Td>
      <Table.Td>{element[tableData[1]]}</Table.Td>
      <Table.Td>{element[tableData[2]]}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>{col1}</Table.Th>
          <Table.Th>{col2}</Table.Th>
          <Table.Th>{col3}</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default ShowTable;
