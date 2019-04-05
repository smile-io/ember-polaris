export function measureColumn(tableData) {
  return function(column, index) {
    const {
      firstVisibleColumnIndex,
      tableLeftVisibleEdge: tableStart,
      tableRightVisibleEdge: tableEnd,
      fixedColumnWidth,
    } = tableData;

    const leftEdge = column.offsetLeft + fixedColumnWidth;
    const rightEdge = leftEdge + column.offsetWidth;
    const isVisibleLeft = isEdgeVisible(leftEdge, tableStart, tableEnd);
    const isVisibleRight = isEdgeVisible(rightEdge, tableStart, tableEnd);
    const isVisible = isVisibleLeft || isVisibleRight;

    if (isVisible) {
      tableData.firstVisibleColumnIndex = Math.min(
        firstVisibleColumnIndex,
        index
      );
    }

    return { leftEdge, rightEdge, isVisible };
  };
}

export function isEdgeVisible(position, start, end) {
  let minVisiblePixels = 30;
  return (
    position >= start + minVisiblePixels && position <= end - minVisiblePixels
  );
}

export function getPrevAndCurrentColumns(tableData, columnData) {
  const { firstVisibleColumnIndex } = tableData;
  const previousColumnIndex = Math.max(firstVisibleColumnIndex - 1, 0);
  const previousColumn = columnData[previousColumnIndex];
  const currentColumn = columnData[firstVisibleColumnIndex];

  return { previousColumn, currentColumn };
}
