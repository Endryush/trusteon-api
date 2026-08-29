const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 20
const MAX_PAGE_SIZE = 50

export function parsePagination (query = {}) {
  const page = Math.max(DEFAULT_PAGE, Number.parseInt(query.page, 10) || DEFAULT_PAGE)
  const pageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, Number.parseInt(query.pageSize, 10) || DEFAULT_PAGE_SIZE)
  )

  return {
    page,
    pageSize,
    limit: pageSize,
    offset: (page - 1) * pageSize
  }
}
