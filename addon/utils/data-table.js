export function measureColumn(tableData) {
  return function(column, index) {
    let {
      tableLeftVisibleEdge,
      tableRightVisibleEdge,
      firstVisibleColumnIndex,
      fixedColumnWidth,
    } = tableData;
    let width = column.offsetWidth;
    let leftEdge = column.offsetLeft - fixedColumnWidth;
    let rightEdge = leftEdge + width;
    let leftEdgeIsVisible = isEdgeVisible(
      leftEdge,
      tableLeftVisibleEdge,
      tableRightVisibleEdge
    );
    let rightEdgeIsVisible = isEdgeVisible(
      rightEdge,
      tableLeftVisibleEdge,
      tableRightVisibleEdge
    );
    let isCompletelyVisible =
      leftEdge < tableLeftVisibleEdge && rightEdge > tableRightVisibleEdge;
    let isVisible =
      isCompletelyVisible || leftEdgeIsVisible || rightEdgeIsVisible;
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
