const Company_container = (companies) => {
  console.log(">", companies)
  return (
    <div>
      abc
      {companies.companies? companies.companies.map((company) => {
        return <div>
        name:{company.name}
        added:{company.added}
        created:{company.created}
        logo_url:{company.url}
        </div>
      }):
      <></>}
    </div>
  )
}

export default Company_container