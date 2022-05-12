import '../styles/TitleDashboard.css';

function TitleDashboard({name}) {
    return <div className="TitleDashboard">
            <h1 className='bonjour'>Bonjour <span className='name'>{name}</span></h1>
            <p className='objective'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
}

export default TitleDashboard