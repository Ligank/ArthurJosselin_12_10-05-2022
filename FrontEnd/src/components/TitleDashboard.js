import '../styles/TitleDashboard.css';

const axios = require('axios').default;
let test;

axios.get('/user/12')
.then((response) => {
console.log(response.data.data.userInfos.firstName)
test = response.data.data.userInfos.firstName;
})

function TitleDashboard() {
    return <div className="TitleDashboard">
            <h1 className='bonjour'>Bonjour <span className='name'>{test}</span></h1>
            <p className='objective'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
}

export default TitleDashboard