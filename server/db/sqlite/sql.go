package sqlite

const getBlocksByMtimeQuery = `
select pos,data,mtime
from blocks b
where b.mtime > ?
order by b.mtime asc
limit ?
`

const getLastBlockQuery = `
select pos,data,mtime
from blocks b
where b.mtime = 0
and b.pos > ?
order by b.pos asc, b.mtime asc
limit ?
`

const countBlocksQuery = `
select count(*) from blocks b where b.mtime >= ? and b.mtime <= ?
`

const getBlockQuery = `
select pos,data,mtime from blocks b where b.pos = ?
`
