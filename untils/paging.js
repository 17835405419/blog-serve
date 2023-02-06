async function paging(model, condition) {
  let { query, page, pageSize, sortQuery, sortStyle, returnQuery } = condition;

  if (!query) {
    query = {};
  }
  // 判断返回什么数据 默认全部返回
  if (!returnQuery || returnQuery != {}) {
    returnQuery = {};
  }

  // 判断排序方式
  let sort = "";
  if (!sortQuery || !sortStyle) {
    // 如果没有传排序方式  默认按时间降序排序
    sort = "-createTime";
  } else {
    sort = {
      sortQuery: Number(sortStyle),
    };
  }

  //判断页码
  if (!page || isNaN(Number(page))) {
    page = 1;
  } else {
    page = Number(page);
  }

  // 判断每一页显示几条数据

  if (!pageSize || isNaN(Number(pageSize))) {
    // 如果不传默认十条
    pageSize = 10;
  } else {
    pageSize = Number(pageSize);
  }

  //   计算总页数
  const count = await model.find(query).count();

  let totalPage = 0; //总页数
  if (count > 0) {
    //向上取整
    totalPage = Math.ceil(count / pageSize);
  }

  //  判断当前页码的范围
  if (page > 0 && page > totalPage && totalPage !== 0) {
    page = totalPage;
  } else if (page < 1) {
    page = 1;
  }

  // 计算起始位置 从零开始算第一页 但是传过来的页数最小是1 所以需要处理
  let start = (page - 1) * pageSize;

  const res = await model
    .find(query, returnQuery)
    .sort(sort)
    .skip(start)
    .limit(pageSize);
  return {
    res,
    count: count,
    page: page,
    pageSize: pageSize,
  };
}

module.exports = paging;
