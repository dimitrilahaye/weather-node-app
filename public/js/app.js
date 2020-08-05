const result = document.getElementById('result');
result.className = 'hide';

const getData = (address) => {
    return new Promise(async (res, rej) => {
        const response = await fetch(`/weather?address=${address}`);
        const data = await response.json();
        if (response.status !== 200) {
            rej({error: data.error});
        }
        res(data);
    });
}

document.getElementById('weather-form').onsubmit = async (e) => {
    e.preventDefault();
    const {0: input} = e.target;
    const {value} = input;
    result.className = '';
    displayResult(['Loading...']);
    try {
        const data = await getData(value);
        displayResult(data);
    } catch(e) {
        displayResult(e);
    }
};

const displayResult = (data) => {
    result.innerText = JSON.stringify(data, null, '\t');
};