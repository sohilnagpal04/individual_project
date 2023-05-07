const devices = JSON.parse(localStorage.getItem('devices')) || [];

devices.forEach(function (device) {
  $('#devices tbody').append(`
      <tr>
        <td>${device.user}</td>
        <td>${device.name}</td>
      </tr>`
  );
});

const api = 'https://api-822h.onrender.com';


$.get(`${api}/light`)
  .then(response => {
    response.forEach(l => {
      $('#lbody').append(`
				<tr>
				    <td>${l.light}</td>
				    <td>${l.brightness}</td>
					<td style="background: ${l.color}"></td>
				</tr>`
      );
    });
  })
$.get(`${api}/ac`)
  .then(response => {
    response.forEach(l => {
      $('#current-temp').append(`
				${l.temperature}`
      );
      $('#current-fan').append(`
				${l.fanSpeed}`
      );
      $('#current-mode').append(`
				${l.mode}`
      );
    });
  })
$.get(`${api}/security`)
  .then(response => {
    response.forEach(l => {
      $('#door1state').append(`
				${l.door1}`
      );
      $('#door2state').append(`
				${l.door2}`
      );
      $('#window1state').append(`
				${l.window1}`
      );
    });
  })

$('#submit-light1').on('click', function () {
  const light = 1;
  const brightness = $('#light1-dropdown').val();
  const color = $('#light1-color').val();

  const body = {
    light,
    brightness,
    color
  }

  $.post(`${api}/light`, body, () => {

    
  })
  location.reload();

});


$('#submit-light2').on('click', function () {
  const light = 2;
  const brightness = $('#light2-dropdown').val();
  const color = $('#light2-color').val();

  const body = {
    light,
    brightness,
    color
  }

  $.post(`${api}/light`, body)
    .then(response => {
      console.log(done);
    })
    .catch(error => {
      console.log(error);
    });
    location.reload();
});
$('#submit-light3').on('click', function () {
  const light = 3;
  const brightness = $('#light3-dropdown').val();
  const color = $('#light3-color').val();

  const body = {
    light,
    brightness,
    color
  }

  $.post(`${api}/light`, body)
    .then(response => {
      console.log(done);
    })
    .catch(error => {
      console.log(error);
    });
    location.reload();
});

$('#subac').on('click', function () {
  const id = 1;
  const
    temperature = $('#temprature').val();
  const fanSpeed = $('#fanSpeed').val();
  const mode = $('#mode-select').val();

  const acbody = {
    id,

    temperature,
    fanSpeed,
    mode
  }
  $.post(`${api}/ac`, acbody)
    .then(response => {
      location.href = '/ac';
      console.log(done);
    })
    .catch(error => {
      console.log(error);
    });
    location.reload();
})

$('#subac').on('click', function () {
  const id = 1;
  const temperature = $('#temprature').val();
  const fanSpeed = $('#fanSpeed').val();
  const mode = $('#mode-select').val();

  const acbody = {
    id,

    temperature,
    fanSpeed,
    mode
  }
  $.post(`${api}/ac`, acbody)
    .then(response => {
      location.href = '/ac';
      console.log(done);
    })
    .catch(error => {
      console.log(error);
    });
    location.reload();
})

$('#subsec').on('click', () => {
  var id = 1;
  var door1 = $('#door1').val();
  var door2 = $('#door2').val();
  var window1 = $('#window1').val();

  const sec = {
    id: id,
    door1,
    door2,
    window1
  }

  $.post(`${api}/security`, sec)
    .then(response => {
      location.href = '/security';
      console.log(done);
    })
    .catch(error => {
      console.log(error);
    });
    location.reload();
});

$('#add-device').on('click', function () {
  const user = $('#user').val();
  const name = $('#name').val();
  devices.push({ user, name });
  localStorage.setItem('devices', JSON.stringify(devices));
  location.href = '/show';
});

$('#delete-device').on('click', function () {
  const name = $('#name').val();
  let index = -1;  // Set the default index to -1 (which means no matching device was found)
  for (let i = 0; i < devices.length; i++) {
    if (devices[i].name === name) {  // Check if the device name matches the input value
      index = i;  // Set the index to the current array index
      break;  // Exit the loop once a match is found
    }
  }
  if (index !== -1) {  // Check if a matching device was found
    devices.splice(index, 1);  // Remove the device from the array
    localStorage.setItem('devices', JSON.stringify(devices));  // Update the localStorage value for devices
    //   console.log('Device deleted:', name);
  } else {
    //   console.log('No matching device found');
  }

  location.href = '/show';  // Change the console.log(devices) to a location.href to view our new list of devices in the table.
});
