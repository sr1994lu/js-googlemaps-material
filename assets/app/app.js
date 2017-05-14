function googlemapsRender() {
  const locations = {
    // 位置情報データ
    'tokyo-station': {
      lat: 35.681298,
      lng: 139.7640529,
    },
    'osaka-station': {
      lat: 34.7024854,
      lng: 135.4937566,
    },
    'kyoto-station': {
      lat: 34.985849,
      lng: 135.7587667,
    },
  };

  // 初期表示のlocationを指定
  const init_location = locations['tokyo-station'];
  let map = new google.maps.Map(document.getElementById('google-map'), {
    center: init_location,
    zoom: 14,
  });
  let marker = new google.maps.Marker({
    // Markerのレンダリング
    position: init_location,
    map: map,
    animation: google.maps.Animation.DROP,
  });

  // ボタンに対応する位置を取得して地図を更新する
  const osakaRender = document.getElementById('osaka-btn');
  // Osaka station
  osakaRender.addEventListener('click', () => {
    let map = new google.maps.Map(document.getElementById('google-map'), {
      center: locations['osaka-station'],
      zoom: 14,
    });
    let marker = new google.maps.Marker({
      position: locations['osaka-station'],
      map: map,
      animation: google.maps.Animation.DROP,
    });
  }, false);
  const kyotoRender = document.getElementById('kyoto-btn');
  // Kyoto station
  kyotoRender.addEventListener('click', () => {
    let map = new google.maps.Map(document.getElementById('google-map'), {
      center: locations['kyoto-station'],
      zoom: 14,
    });
    let marker = new google.maps.Marker({
      position: locations['kyoto-station'],
      map: map,
      animation: google.maps.Animation.DROP,
    });
  }, false);

  // GeoCodeで位置を取得し、地図を更新する
  function open(blob) {
    return new Promise(function(resolve, reject) {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', function() {
        resolve(this.result);
      });
      fileReader.addEventListener('error', function() {
        reject(this.error);
      });
      fileReader.readAsText(blob);
    });
  }

  const searchRender = document.getElementById('search-btn');
  searchRender.addEventListener('click', () => {
    const geocodingParams = {
      // Request parameters
      'address': $('#search-input').val(),
      'key': 'AIzaSyDDcGqO_kmfh6g4JSY1KruMo2fGM33wTq8',
    };
    const geocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?'
        + $.param(geocodingParams);
    fetch(geocodingUrl).then((res) => {
      if (res.ok) {
        return res.blob();
      }
      throw new Error('Network is bad.');
    }).then((blob) => {
      return open(blob).then((json) => {
        return JSON.parse(json);
      });
    }).then((results) => {
      const result = results['results'];
      const index0 = result['0'];
      const geometry = index0['geometry'];
      const location = geometry['location'];
      const lat = location['lat'];
      const lng = location['lng'];

      let map = new google.maps.Map(document.getElementById('google-map'), {
        center: {lat, lng},
        zoom: 14,
      });
      let marker = new google.maps.Marker({
        position: {lat, lng},
        map: map,
        animation: google.maps.Animation.DROP,
      });
    });
  }, false);
}
