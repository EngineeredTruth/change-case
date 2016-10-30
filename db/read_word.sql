select * from savedwords
where word like $1
and externalid = $2;
