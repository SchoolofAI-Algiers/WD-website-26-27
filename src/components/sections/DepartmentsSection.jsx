const containerStyle = {
  padding: '4rem 2rem',
}

function DepartmentsSection() {
  return (
    <section id="departments" className="departments-section" style={containerStyle}>
      <div className="departments-section__inner">
        <h2 className="departments-section__title">Departments Placeholder</h2>
        <p className="departments-section__text">
          Department cards and descriptions go here.
        </p>
      </div>
    </section>
  )
}

export default DepartmentsSection
