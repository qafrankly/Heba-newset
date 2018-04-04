import React, { Component, PropTypes } from 'react';
import XML2JS from 'xml2js';
import WeatherController from 'components/custom/griffin/WeatherController';
//import AdvertisementUnit from '/components/AdvertisementUnit.js';
const jQuery = window['$'];
const JChart = window['Chart'];
const JPikaday = window['Pikaday'];
const JProgressBar = window['ProgressBar'];
window.testArr = [];

window.wxGlobals = {
  initialSetup: true,
  lowLabel: 0,
  actualLow: 0,
  builtRadial: false,
  eventAdded: false
};
let bar;
const station = window.location.hostname.toLowerCase() === 'www.news9.com' ? 'kwtv' : 'kotv';
const stationID = station === 'kwtv' ? 2 : 1;
const stationName = station === 'kwtv' ? 'News 9' : 'News On 6';
const shortcode = station === 'kwtv' ? '9CONNECT' : '6CONNECT';
const radarName = station === 'kwtv' ? 'ESP' : 'WARN';
const iosAppUrl = station === 'kwtv' ?
  'https://itunes.apple.com/us/app/news-9-weather/id428652359?mt=8' :
  'https://itunes.apple.com/us/app/news-on-6-weather/id429007990?mt=8';
const androidAppUrl = station === 'kwtv' ?
  'https://play.google.com/store/apps/details?id=com.wdtinc.android.KWTV&hl=en' :
  'https://play.google.com/store/apps/details?id=com.wdtinc.android.KOTV&hl=en';
const todaysDate = new Date();
const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'];
//const originYear = 2010;
/* Styles */
const containerStyle = {};
const h2style = {
  fontWeight: 300,
  fontSize: '33.07px',
  color: '#111',
  margin: '27px 0'
};
const h3style = {
  fontWeight: 300,
  fontSize: '27.56px',
  color: '#111',
  margin: '27px 0'
};
const h3stylewhite = {
  fontWeight: 400,
  fontSize: '27.56px',
  color: '#fff',
  margin: '0 0 17px'
};
const citysty = {
  fontWeight: 400,
  color: '#111',
  textDecoration: 'none',
  borderBottom: '1px dashed #111'
};
const isty = {
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: '13.63px',
  color: '#333',
  display: 'block'
};
const wxiconsty = {
  width: '48px',
  height: '48px'
};
const whitecard = {
  display: 'inline-block',
  verticalAlign: 'top',
  position: 'relative',
  background: '#fff',
  width: '1068px',
  borderRadius: '3px',
  padding: '30px',
  boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.42)',
  minHeight: '360px',
  marginBottom: '50px',
  marginRight: '30px'
};
const tempsty = {
  fontWeight: 500,
  fontSize: '41.89px',
  color: '#111',
  marginLeft: '7px'
};
const tempcondition = {
  float: 'left',
  width: '185px',
  padding: '22px 0 0',
  position: 'relative',
  marginRight: '30px'
};
const wxcondition = {
  textAlign: 'center',
  clear: 'both'
};
const toprowspan = {
  fontWeight: 400,
  fontSize: '41.89px',
  color: '#111'
};
const bottomrowspan = {
  fontWeight: 400,
  fontSize: '24.91px',
  color: '#111'
};
const daycast = {
  width: '143px',
  height: '356px',
  float: 'left',
  marginRight: '1px'
};
const dayname = {
  textAlign: 'center',
  backgroundColor: '#333',
  height: '45px',
  color: '#fff',
  lineHeight: '45px',
  textTransform: 'uppercase',
  fontSize: '17.84px',
  fontWeight: 500
};
const currentsection = {
  height: '300px'
};
const forecastsection = {
  height: '356px',
  position: 'relative'
};
const bottomday = {
  transition: 'background 0.3s',
  position: 'relative',
  backgroundColor: '#f5f5f5',
  height: '311px',
  borderRight: '1px solid #ccc',
  padding: '12px 10px 10px'
};
const forecastcondicon = {
  width: '50px',
  height: '50px'
};
const conditiontext = {
  textAlign: 'center',
  color: '#111',
  fontSize: '17.84px',
  letterSpacing: '-0.005em',
  lineHeight: '20.44px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '40px',
  marginBottom: '13px'
};
const temphigh = {
  textAlign: 'center',
  color: '#111',
  fontSize: '43.29px',
  fontWeight: 500,
  lineHeight: '49.29px',
  letterSpacing: '-0.01em',
  height: '46px'
};
const templow = {
  textAlign: 'center',
  color: '#666',
  fontSize: '43.29px',
  fontWeight: 300,
  lineHeight: '49.29px',
  letterSpacing: '-0.01em',
  marginBottom: '16px'
};
const conditionimg = {
  textAlign: 'center',
  marginBottom: '11px'
};
const supstyle = {
  verticalAlign: 'text-top'
};
const precip = {
  textAlign: 'center',
  fontSize: '24.27px',
  lineHeight: '24.27px',
  letterSpacing: '-0.005em',
  color: '#49679c'
};
const widecol = {
  width: '1008px'
};
const currentdetail = {
  float: 'left'
};
const detailul = {
  padding: 0,
  listStyle: 'none'
};
const radialprogsty = {
  width: '182px',
  height: '91px'
};
const radarcontainer = {
  height: '454px',
  float: 'left'
};
const skycamcontainer = {
  height: '454px',
  float: 'right'
};
const radarsty = {
  float: 'left',
  width: '336px',
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.42)',
  borderRadius: '3px',
  overflow: 'hidden',
  marginRight: '15px'
};
const radarimgucontrol = {
  width: '336px',
  height: '189px',
  backgroundImage: 'url(http://ftpcontent.worldnow.com/kwtv/weather/streetlevelFull.gif)',
  backgroundSize: 'cover',
  backgroundPositionY: '-28px'
};
const radarimgwarn = {
  width: '336px',
  height: '189px',
  backgroundImage: 'url(http://aws.kotv.com/MorHtml5/kotv/comp/960x540/statewide_anim.gif)',
  backgroundSize: 'cover'
};
const radarh4 = {
  color: '#000',
  margin: 0,
  padding: '10px 7px 6px'
};
const radaranchor = {
  textDecoration: 'none',
  display: 'block'
};
const radaranchorspan = {
  fontWeight: 'normal'
};
const weather2item = {
  float: 'left',
  marginRight: '20px'
};
const curwxiconbox = {
  float: 'left',
  marginTop: '5px',
  marginLeft: '30px'
};
const skycamsty = {
  float: 'right',
  width: '306px',
  background: '#e5e5e5',
  borderRadius: '3px',
  overflow: 'hidden'
};
const clearfix = {
  clear: 'both'
};
const iosbtnsty = {
  display: 'block',
  float: 'left'
};
const androidbtnsty = {
  display: 'block',
  float: 'left',
  margin: '0 10px'
};
const blackstrip = {
  background: '#000',
  margin: '20px 0',
  padding: '24px 24px 30px'
};
const blackLeft = {
  display: 'inline-block',
  width: '32.5%',
  verticalAlign: 'top'
};
const blackRight = {
  display: 'inline-block',
  width: '67.5%',
  padding: '0 1%',
  verticalAlign: 'top'
};
const blackleftimg = {
  display: 'block'
};
const h4style = {
  fontWeight: 500,
  fontSize: '24.91px',
  color: '#fff',
  margin: 0
};
const pstyle = {
  fontWeight: 400,
  fontSize: '17.84px',
  color: '#fff',
  lineHeight: '25px',
  margin: '20px 0 40px'
};
const phonespansty = {
  color: '#fff',
  fontSize: '16px',
  height: '40px',
  lineHeight: '40px'
};
const almanach4 = {
  fontSize: '17.84px',
  fontWeight: 500,
  marginTop: 0,
  marginBottom: '15px'
};
const almanacinput = {
  paddingLeft: '5px',
  marginLeft: '10px',
  cursor: 'pointer'
};
const googlebadge = {
  height: '40px'
};
const chartsty = {
  float: 'left',
  marginRight: '1%'
};
const chartsnowsty = {
  float: 'left',
  display: 'none'
};
const radarpsty = {
  fontSize: '13px',
  padding: '0 10px'
};
const hourlyUL = {
  listStyle: 'none',
  margin: 0,
  overflow: 'hidden',
  background: '#fff',
  height: '275px',
  padding: 0
};
const almanacdiv = {
  height: '280px'
};
const calendarIcon = {
  position: 'absolute',
  right: '3px',
  top: '3px',
  zIndex: 0,
  pointerEvents: 'none'
};
const calendarSpan = {
  position: 'relative'
};
const sizechecker = {
  width: '32%',
  height: 0
};
const detailslink = {
  color: '#666',
  textDecoration: 'none',
  cursor: 'pointer'
};
const ad300x250 = {
  width: '300px',
  height: '263px',
  paddingTop: '13px',
  background: 'url(http://ftpcontent.worldnow.com/kotv/ads/ad52_header.png) no-repeat',
  marginBottom: '30px'
};
const rightcol = {
  width: '300px',
  display: 'inline-block'
};
const hourlydiv = {
  clear: 'both',
  margin: '10px 0 30px'
};
/* inline non-react styles */
const hourLIsty = `
  float:left;height:100%;position:relative;font:12px/12px sans-serif;width:56px;
  border-left:1px solid #ebebeb;`;
const hourspanbar = `padding:0 0 50px;width:52px;position:absolute;left:2px;bottom:23px;
  display:block;text-align:center;box-sizing:content-box;`;
const hourspantemp = `bottom:6px;color:#fff;width:52px;text-align:center;left:0;font-weight:bold;
  position:absolute;display:block;font-size:18px;`;
const hourspantime = `top:0;color:#666;position:absolute;display:block;text-align:center;
  width:100%;`;
const hourimgsty = `width:24px;display:block;position:absolute;bottom:-3px;left:50%;
  transform:translateX(-50%);`;
const popovercontent = 'padding:9px 14px;';
const popovertitle = `background-color:#222;color:#fff;padding:8px 14px;margin:0;
  font-size:14px;border-bottom:1px solid #ebebeb;border-radius:5px 5px 0 0;`;
const blackbox = `width:100%;height:100%;position:absolute;top:0;left:0;
  background:rgba(0,0,0,.7);`;
const zipbox = `background: white;padding: 25px;margin: 25px auto 0;width: 285px;
  border: 4px solid #ccc;position: relative;font: 14px sans-serif;overflow: hidden;`;
const zipclose = `cursor: pointer;position: absolute;right: 4px;font-weight: bold;top: 0;
  padding: 3px;`;
const zipinput = 'width:60px;margin-left:10px;text-align:center;';

class WeatherBlock extends Component{

static displayName = 'WeatherBlock';

  constructor(props){
    super(props);
    this.state = {
      updated: '',
      city: '',
      state: '',
      conditionIcon: '',
      temp: '',
      conditionText: '',
      feelsLike: '',
      dew: '',
      humidity: '',
      visibility: '',
      windSpeed: '',
      windDirection: '',
      pressure: '',
      forecasts: []
    };
  }

  componentDidMount(){
    let wxController = new WeatherController(stationID);
    wxController.getCache('currents', this.buildState);
    wxController.getCache('skycam', this.buildSkycam);
    wxController.getCache('almanac', this.buildAlmanac);
  }

  buildSkycam = (data) => {
    const skycamdata = data;
    const skycamamt = skycamdata.length;
    //const navitemamt = Math.ceil(skycamamt / 2.5);
    const skycamLIwidth = 100;
    const skycamLIheight = 68;
    const skycamLImargin = 10;
    const skycamnavsty = 'color:#333;font-size:24px;padding:0 5px;';
    const skycamnavstyLeft = `${skycamnavsty}float:left;`;
    const skycamnavstyRight = `${skycamnavsty}float:right;`;
    const ulwidth = (skycamdata.length * (skycamLIwidth + skycamLImargin)) - skycamLImargin;

    let fileend = skycamdata[0].type === 'webcam' ? '.jpg' : '00001.jpg';
    let bulletHtml = '';
    let skycamhtml = `
      <div>
        <div id="skycamheader" style="line-height:32px;padding:0 10px;position:relative;">
          <span style="font-size:12.63px;font-weight:500;">${skycamdata[0]['cam_name']}</span>
          <div id="skycamVideoBtn" style="border-radius:3px;cursor:pointer;float:right;margin: 1px 0 0 0;padding: 0 7px;color:#333;border-radius: 3px;"><i class="fa fa-video-camera"></i></div>
          <div id="skycamPicture" class="active" style="border-radius:3px;cursor:pointer;float:right;margin:1px 0 0 0;padding: 0 7px;"><i class="fa fa-camera"></i></div>
        </div>
        <div id="skycammain" style="height:196px;">
          <video style="display:none;clear:both;object-fit:initial;box-shadow:0px 1px 2px 0px rgba(0,0,0,.4);" id="skycamvideo" width="306" height="196" controls>
            <source src="${skycamdata[0]['movie_path']}_cam.mp4?nocache=${(new Date().getTime())}" type="video/mp4">
          </video>
          <img id="curSkycamImage" src="${skycamdata[0]['file_path']}${fileend}" style="display:block;width:306px;height:196px;clear:both;box-shadow:0px 1px 2px 0px rgba(0,0,0,.4);" />
        </div>
        <div id="skycamthumbs" style="overflow:hidden;width:306px;padding:12px 0 12px 8px;position:relative;">
          <div style="position:relative;height:104px;margin-bottom:5px;"><ul id="skycamthumbul" style="list-style:none;padding:0;margin:0;width:${ulwidth}px;position:absolute;top:0;left:0;">
      `;
    for (let i = 0; i < skycamamt; i += 1){
      let tmpstyle = 'float:left;cursor:pointer;width:100px;';
      let listyle = ((i + 1) === skycamamt) ? tmpstyle : `${tmpstyle}margin-right: ${skycamLImargin}px;`;
      let fileending = skycamdata[i].type === 'webcam' ? '.jpg' : '00001.jpg';
      let isselected = i === 0 ? 'selected' : '';
      skycamhtml += `
        <li class="skycamitem ${isselected}" data-title="${skycamdata[i]['cam_name']}" data-path="${skycamdata[i]['movie_path']}" style="${listyle}">
          <img width="${skycamLIwidth}" height="${skycamLIheight}" src="${skycamdata[i]['file_path']}${fileending}" />
          <span style="font-size:12.63px;font-weight:500;display:block;text-align:center;">${skycamdata[i]['cam_name']}</span>
        </li>
        `;
      if (i % 3 === 0){
        let circletype = i === 0 ? '' : '-o';
        bulletHtml += `<li style="float:left;cursor:pointer;margin-right:3px;"><i class="fa fa-circle${circletype}"></i></li>`;
      }
    }
    skycamhtml += `
            </ul>
          </div>
          <div id="skycamnav" style="padding-right:8px;">
            <a style="${skycamnavstyLeft}" href="#" id="skycamleft" class="disabled">
              <i style=""class="fa fa-angle-left"></i>
            </a>
            <ul id="skycamnavbullets" style="list-style:none;position: absolute;bottom: 16px;left: 50%;padding: 0;margin: 0;transform: translateX(-50%);">${bulletHtml}</ul>
            <a style="${skycamnavstyRight}" href="#" id="skycamright">
              <i style="" class="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
    `;

    jQuery('#skycamsection').html(skycamhtml);
    jQuery('#skycamheader > div').on('click', function(){
      let $btn = jQuery(this);
      if (!$btn.hasClass('active')){
        $btn.parent().find('.active').removeClass('active');
        $btn.addClass('active');
        if ($btn.attr('id') === 'skycamVideoBtn'){
          //handle going to video
          jQuery('#skycammain > img').hide();
          jQuery('#skycammain > video').show();
        } else {
          //handle going to image
          jQuery('#skycammain > video').hide();
          jQuery('#skycammain > img').show();
        }
      }
    });
    jQuery('#skycamthumbul').on('click', 'li', function(){
      let $this = jQuery(this);
      let $videoplayer = jQuery('#skycamvideo');
      let $img = jQuery('#curSkycamImage');
      let $videosrc = $videoplayer.children('source');
      let $videoheader = jQuery('#skycamheader span');
      let skycamtitle = $this.attr('data-title');
      let skycampath = `${$this.attr('data-path')}_cam.mp4`;
      let imgSrc = $this.children('img').attr('src');
      $videoplayer[0].pause();
      if ($videosrc.attr('src') !== skycampath){
        jQuery('.skycamitem').removeClass('selected');
        $this.addClass('selected');
        $videosrc.attr('src', skycampath);
        $videoheader.html(skycamtitle);
        $videoplayer[0].load();
        $img.attr('src', imgSrc);
      }
      if (jQuery('#skycamVideoBtn').hasClass('active')){
        $videoplayer[0].play();
      }
    });

    function moveSlides(type, ele){
      let $mainUL = jQuery('#skycamthumbul');
      if (!$mainUL.hasClass('animating')){
        $mainUL.addClass('animating');
        let firstCam = jQuery('.skycamitem').eq(0);
        let singleSize = firstCam.width() + parseInt(firstCam.css('marginRight'), 10);
        let perMove = singleSize * 2;
        let bulletMove = singleSize * 3;
        let leftNav = jQuery('#skycamleft');
        let rightNav = jQuery('#skycamright');
        let newLeft;
        if (type === 'arrow'){
          if (ele.attr('id') === 'skycamleft'){
            //add left

            rightNav.removeClass('disabled');
            newLeft = parseInt($mainUL.css('left'), 10) + perMove;
            $mainUL.animate({
              left: newLeft
            }, 300, () => {
              if (parseInt($mainUL.css('left'), 10) === 0){
                leftNav.addClass('disabled');
              }
              let bulletSelectIndex = Math.abs(parseInt(newLeft / bulletMove, 10));
              jQuery('#skycamnavbullets li').each(function(i){
                let iChild = jQuery(this).children('i');
                if (iChild.hasClass('fa-circle') && i !== bulletSelectIndex){
                  iChild.removeClass('fa-circle').addClass('fa-circle-o');
                } else if (i === bulletSelectIndex && !iChild.hasClass('fa-circle')){
                  iChild.removeClass('fa-circle-o').addClass('fa-circle');
                }
              });
              $mainUL.removeClass('animating');
            });
          } else if (ele.attr('id') === 'skycamright'){
            leftNav.removeClass('disabled');
            newLeft = parseInt($mainUL.css('left'), 10) - perMove;
            $mainUL.animate({
              left: newLeft
            }, 300, () => {
              if ((Math.abs(parseInt($mainUL.css('left'), 10)) + perMove, 10) > $mainUL.width()){
                rightNav.addClass('disabled');
              }
              let bulletSelectIndex = Math.abs(parseInt(newLeft / bulletMove, 10));
              jQuery('#skycamnavbullets li').each(function(i){
                let iChild = jQuery(this).children('i');
                window.testArr.push(iChild);
                if (iChild.hasClass('fa-circle') && i !== bulletSelectIndex){
                  iChild.removeClass('fa-circle').addClass('fa-circle-o');
                } else if (i === bulletSelectIndex && !iChild.hasClass('fa-circle')){
                  iChild.removeClass('fa-circle-o').addClass('fa-circle');
                }
              });
              $mainUL.removeClass('animating');
            });
          }
        } else if (type === 'bullet'){
          let prevBullet = ele.parent().find('.fa-circle').parent();
          let bulIndex = ele.index();
          prevBullet.children('i').removeClass('fa-circle').addClass('fa-circle-o');
          ele.children('i').removeClass('fa-circle-o').addClass('fa-circle');
          $mainUL.animate({
            left: (bulletMove * bulIndex) * -1
          }, 300, () => {
            if (parseInt($mainUL.css('left'), 10) === 0){
              leftNav.addClass('disabled');
            } else {
              leftNav.removeClass('disabled');
            }
            if ((Math.abs(parseInt($mainUL.css('left'), 10)) + bulletMove) > $mainUL.width()){
              rightNav.addClass('disabled');
            } else {
              rightNav.removeClass('disabled');
            }
            $mainUL.removeClass('animating');
          });
        }
      }
    }

    jQuery('#skycamnav').on('click', 'a', function(e){
      e.preventDefault();
      if (!jQuery(this).hasClass('disabled')){
        let $this = jQuery(this);
        moveSlides('arrow', $this);
      }
    });

    jQuery('#skycamnavbullets').on('click', 'li', function(){
      if (!jQuery(this).children('i').hasClass('fa-circle')){
        moveSlides('bullet', jQuery(this));
      }
    });
  }

  buildWindChart = (data) => {
    const hoursTotal = 18;
    let tmpNum = 0;
    let windchartctx = jQuery('#windchart');
    let dataArr = [];
    let labelArr = [];
    //data.map((ele) => {
    for (let i = 0; i < data.length; i += 1){
      let ele = data[i];
      if (tmpNum < hoursTotal){
        tmpNum += 1;
        let thehour = parseInt(ele['time_local'].split(' ')[1].split(': ')[0], 10);
        let hourTxt = '';
        dataArr.push(Math.round(ele['wnd_spd_mph']));
        if (thehour === 0){
          hourTxt = '12am';
        } else if (thehour < 12) {
          hourTxt = `${thehour}am`;
        } else {
          hourTxt = `${(thehour % 12)}pm`;
        }
        labelArr.push(hourTxt);
      }
    }
    let dataObj = {
      labels: labelArr,
      datasets: [
        {
          //label: 'Wind Prediction Chart',
          fill: true,
          data: dataArr,
          pointBorderColor: '#ff0000',
          backgroundColor: '#aab7be',
          pointBackgroundColor: '#f5f5f5',
          lineTension: 0
        }
      ]
    };
    let optionsObj = {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
            suggestedMax: 20,
            stepSize: 5
          }
        }]
      },
      title: {
        display: false,
        text: 'Wind Prediction'
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: tooltipItems => `${tooltipItems.yLabel}mph`
        }
      }
    };
    /*eslint-disable no-unused-vars*/
    let windLineChart = new JChart(windchartctx, {
      type: 'line',
      data: dataObj,
      options: optionsObj
    });
    /*eslint-enable no-unused-vars*/
  }

  buildHourly = (data) => {
    const hoursTotal = 18;
    let hours = data['forecasts']['hourly'];
    window.testhours = hours;
    let tmphtml = '';
    let reds = [0, 144, 255];
    let greens = [0, 128, 0];
    let blues = [255, 144, 0];
    let tempArr = hours.map(hour => hour['temp_F']);
    let maxTemp = parseInt(Math.max(...tempArr), 10);
    let minTemp = parseInt(Math.min(...tempArr), 10);
    let delta = maxTemp - minTemp;

    function getVal(color, temp){
      let less = temp < 50;
      let weight = (((temp % 50) * 2) / 100);
      let color1 = less ? color[0] : color[1];
      let color2 = less ? color[1] : color[2];
      return Math.floor((color1 * (1 - weight)) + (color2 * weight));
    }

    for (let i = 0; i < hoursTotal; i += 1){
      let curHour = hours[i];
      let curTemp = parseInt(curHour['temp_F'], 10);
      let hourTime = parseInt(curHour['time_local'].split(' ')[1].split(': ')[0], 10);
      let iconType = curHour['WxIconType']['#text'];
      let condText = curHour['wx'];
      let dayNight = 'day';
      let color = '';
      let height = Math.floor(((curTemp - minTemp) / delta) * 45);
      let ampm;
      if (hourTime > 17 || hourTime < 8){
        dayNight = 'night';
      }
      if (hourTime === 0){
        hourTime = 12;
      }
      if (hourTime > 12){
        ampm = 'PM';
        hourTime %= 12;
      } else {
        ampm = 'AM';
      }

      let iconUrl = `http://ftpcontent.worldnow.com/kwtv/custom/icons/wx/${dayNight}/${iconType}.png`;

      if (curTemp > 99){
        color = `${reds[2]},${greens[2]},${blues[2]}`;
      } else if (curTemp < 0){
        color = `${reds[0]},${greens[0]},${blues[0]}`;
      } else {
        let red = getVal(reds, curTemp);
        let green = getVal(greens, curTemp);
        let blue = getVal(blues, curTemp);
        color = `${red},${green},${blue}`;
      }
      tmphtml += `
        <li style="${hourLIsty}">
          <span class="bar" style="background: rgb(${color}); height:${height}%; ${hourspanbar}" data-height="${height}">
            <span class="temp" style="${hourspantemp}">${curTemp}&deg;</span>
          </span>
          <span class="time" style="${hourspantime}">${hourTime} ${ampm}</span>
          <img src="${iconUrl}" alt="${condText}" title="${condText}" style="${hourimgsty}" />
        </li>
      `;
    }
    jQuery('#hourlyForecast > ul').html(tmphtml);
    this.buildWindChart(hours);
  }

  buildAlmanac = (data, isToday = true) => {
    window.chartArr = [];
    JChart.defaults.global.legend.display = false;
    let parseString = XML2JS.parseString;
    let jsondata;
    parseString(data, {attrNameProcessors: [(name => `@${name}`)], explicitArray: false, charkey: "#text", mergeAttrs: true}, (err, result) => { jsondata = result; });
    window.testalmanac = jsondata;
    let datasrc = jsondata['locations']['location'];
    let daydata = datasrc['day'];
    let highctx = jQuery('#highChart');
    let lowctx = jQuery('#lowChart');
    let rainctx = jQuery('#rainChart');
    let snowctx = jQuery('#snowChart');
    let locDiv = jQuery('#almanacLoc');
    let daymax = daydata['temp_max'];
    let averageHigh = daydata['normal_max'];
    let recordmax = daydata['record_max_max'];
    let daylow = daydata['temp_min'];
    let averageLow = daydata['normal_min'];
    let recordmin = daydata['record_min_min'];
    let precipday = daydata['precip_in'];
    let precipmtd = daydata['precip_mtd'];
    let precipytd = daydata['precip_ytd'];
    let snowday = daydata['snow_day'];
    let snowmtd = daydata['snow_mtd'];
    let city = datasrc['@request_city'];
    let state = datasrc['@request_state'];
    let snowEnabled = false;
    let cityStateStr = `${city}, ${state}`;

    locDiv.html(cityStateStr);

    if (parseInt(snowmtd, 10) > 0){
      snowEnabled = true;
      jQuery('#almanacContainer #sizechecker').css('width', '24%');
      jQuery('#snowChart').show();
    } else {
      jQuery('#almanacContainer #sizechecker').css('width', '32%');
      jQuery('#snowChart').hide();
    }

    jQuery('#almanacContainer canvas').each(function(){
      jQuery(this).attr('width', parseInt(jQuery('#sizechecker').width(), 10));
    });

    window.wxGlobals.lowLabel = recordmin;
    window.wxGlobals.actualLow = daylow;
    recordmin = recordmin < 0 ? 0 : recordmin;
    daylow = daylow < 0 ? 0 : daylow;

    let chartOpts = {
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          barPercentage: 0.9,
          categoryPercentage: 1.0
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            display: false
          }
        }]
      },
      responsive: false,
      events: false,
      tooltips: {
        enabled: false
      },
      layout: {
        padding: {
          top: 15
        }
      },
      hover: {
        animationDuration: 0
      },
      animation: {
        duration: 1,
        onComplete: (singChart) => {
          let chartInstance = singChart.chartInstance.chart;
          let ctx = chartInstance.ctx;
          ctx.font = JChart.helpers.fontString(14, 'bold', 'Roboto');
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          //window.testmychart = chartInstance;
          singChart.chartInstance.data.datasets.forEach((dataset, i) => {
            let meta = chartInstance.controller.getDatasetMeta(i);
            let barAmt = meta.data.length;
            meta.data.forEach((cBar, cIndex) => {
              window.chartArr.push(cBar);
              let cData = dataset.data[cIndex];
              let lastIndex = (barAmt - 1);
              let newY;
              let modifiedData;
              let newData;
              if (chartInstance['canvas']['id'] === 'lowChart'){
                if (barAmt === 3 && cIndex === 0){
                  newData = window.wxGlobals.actualLow;
                } else if (cIndex === lastIndex){
                  newData = window.wxGlobals.lowLabel;
                } else {
                  newData = cData;
                }
              } else {
                newData = cData;
              }
              if (cBar._model.y > 147){
                newY = cBar._model.y - 5;
                ctx.fillStyle = cBar._model.backgroundColor;
              } else {
                newY = cBar._model.y + 25;
                ctx.fillStyle = 'white';
              }
              if (chartInstance['canvas']['id'] === 'rainChart' || chartInstance['canvas']['id'] === 'snowChart'){
                modifiedData = `${newData}"`;
              } else {
                modifiedData = `${newData}°`;
              }
              ctx.fillText(modifiedData, cBar._model.x, newY);
            });
          });
        }
      }
    };
    let highChartOpts = Object.assign({}, chartOpts, {
      title: {
        display: true,
        text: 'High Temperature',
        fontColor: '#111'
      }
    });
    let lowChartOpts = Object.assign({}, chartOpts, {
      title: {
        display: true,
        text: 'Low Temperature',
        fontColor: '#111'
      }
    });
    let rainChartOpts = Object.assign({}, chartOpts, {
      title: {
        display: true,
        text: 'Rain Accumulation',
        fontColor: '#111'
      }
    });
    let snowChartOpts = Object.assign({}, chartOpts, {
      title: {
        display: true,
        text: 'Snow Accumulation',
        fontColor: '#111'
      }
    });
    let highlowLabelArr;
    let rainLabelArr;
    let highDataArr;
    let lowDataArr;
    let rainDataArr;
    let highBG;
    let lowBG;
    let rainBG;

    if (isToday) {
      highlowLabelArr = ['Average', 'Record'];
      highDataArr = [averageHigh, recordmax];
      highBG = ['rgba(222,13,18,1)', 'rgba(148, 9, 13,1)'];
      lowDataArr = [averageLow, recordmin];
      lowBG = ['rgba(73,172,199,1)', 'rgba(14, 73, 90,1)'];
      rainLabelArr = ['MTD', 'YTD'];
      rainDataArr = [precipmtd, precipytd];
      rainBG = ['rgba(0,191,10,1)', 'rgba(0, 128, 6,1)'];
    } else {
      highlowLabelArr = ['Actual', 'Average', 'Record'];
      highDataArr = [daymax, averageHigh, recordmax];
      highBG = ['rgba(222,13,18,1)', 'rgba(148, 9, 13,1)', 'rgba(92,0,2,1)'];
      lowDataArr = [daylow, averageLow, recordmin];
      lowBG = ['rgba(73,172,199,1)', 'rgba(14, 73, 90,1)', 'rgba(16,48,66,1)'];
      rainLabelArr = ['Day', 'MTD', 'YTD'];
      rainDataArr = [precipday, precipmtd, precipytd];
      rainBG = ['rgba(0,191,10,1)', 'rgba(0, 128, 6,1)', 'rgba(0,64,3,1)'];
    }


    if (window.wxGlobals.initialSetup){
      let tmpThis = this;
      let pika = new JPikaday({
        field: jQuery('#almanacDP')[0],
        defaultDate: todaysDate,
        setDefaultDate: true,
        maxDate: todaysDate,
        minDate: (new Date(2010, 1, 1)),
        onSelect: () => {
          let selectedDate = this['_d'];
          let yr = selectedDate.getFullYear();
          let mo = selectedDate.getMonth() + 1;
          let d = selectedDate.getDate();
          if (mo < 10){
            mo = `0${mo}`;
          }
          if (d < 10){
            d = `0${d}`;
          }
          let dateFeedEnd = `${yr}-${mo}-${d}`;
          let wxController = new WeatherController(stationID);
          wxController.getCache('almanac', tmpThis.buildAlmanac, undefined, dateFeedEnd);
        }
      });
      console.log(pika.getDate());
      window.wxGlobals.initialSetup = false;
    }
  /*eslint-disable no-unused-vars*/
    let highChart = new JChart(highctx, {
      type: 'bar',
      data: {
        labels: highlowLabelArr,
        datasets: [{
          data: highDataArr,
          backgroundColor: highBG,
          borderWidth: 0
        }]
      },
      options: highChartOpts
    });

    let lowChart = new JChart(lowctx, {
      type: 'bar',
      data: {
        labels: highlowLabelArr,
        datasets: [{
          data: lowDataArr,
          backgroundColor: lowBG,
          borderWidth: 0
        }]
      },
      options: lowChartOpts
    });

    let rainChart = new JChart(rainctx, {
      type: 'bar',
      data: {
        labels: rainLabelArr,
        datasets: [{
          data: rainDataArr,
          backgroundColor: rainBG,
          borderWidth: 0
        }]
      },
      options: rainChartOpts
    });

    if (snowEnabled){
      let snowChart = new JChart(snowctx, {
        type: 'bar',
        data: {
          labels: ['Day', 'MTD'],
          datasets: [{
            data: [snowday, snowmtd],
            backgroundColor: ['rgb(137,42,225)', 'rgb(59,18,97)'],
            borderWidth: 0
          }]
        },
        options: snowChartOpts
      });
    }
    /*eslint-enable no-unused-vars*/
  }

  buildState = (data) => {
    function formatIcon(icon){
      if (icon.indexOf('/') > -1){
        return icon.split('/')[1];
      } else {
        return icon;
      }
    }
    let parseString = XML2JS.parseString;
    let forecasts = [];
    let jsondata;
    parseString(data,
      {
        attrNameProcessors: [(name => `@${name}`)],
        explicitArray: false,
        charkey: "#text",
        mergeAttrs: true
      },
      (err, result) => {
        jsondata = result;
      }
    );
    let maindata = jsondata["WxSources"];
    let forecastdata;
    let currentdata = maindata["conditions"]["sfc_ob"];
    let UTCtime = currentdata["ob_time"];
    let localtime = new Date(`${UTCtime} UTC`);
    let updatedtime = `
      ${dayArr[localtime.getDay()]}, 
      ${monthArr[localtime.getMonth()]} ${localtime.getDate()}, 
      ${localtime.getFullYear()}
    `;
    let localtemp = currentdata["temp"]["#text"];
    let barpct = localtemp / 110;
    let tmpThis = this;
    let normFormat = true;

    if (typeof maindata["forecast"]["WxForecasts"] !== 'undefined'){
      forecastdata = maindata["forecast"]["WxForecasts"]["WxForecast"];
      jQuery('.forecastSection').removeClass('altzip');
    } else {
      forecastdata = maindata["forecast"]["forecast"]["daily_summary"];
      normFormat = false;
      jQuery('.forecastSection').addClass('altzip');
    }

    window.teststuff = jsondata;
    let iconUrl = 'http://ftpcontent.worldnow.com/griffin/gnm/testing/svg/day/';
    for (let i = 0, len = forecastdata.length; i < len; i += 1){
      let curForecast = forecastdata[i];
      let fullDate;
      let dateStr = '';
      if (normFormat){
        fullDate = new Date(curForecast["@Date"]);
        dateStr = `
          ${dayArr[fullDate.getUTCDay()]}, 
          ${monthArr[fullDate.getMonth()].substring(0, 3)} ${fullDate.getDate()}, 
          ${fullDate.getFullYear()}
        `;
      }
      let tmpObj = {
          key: i,
          id: normFormat ? curForecast["@WxForecastId"] : curForecast["summary_date"].replace('/', ''),
          date: normFormat ? dayArr[(new Date(curForecast["@Date"])).getUTCDay()] : dayArr[(new Date(curForecast["summary_date"])).getUTCDay()],
          condition: normFormat ? curForecast["Condition"].replace(/&amp;/g, '&') : curForecast["wx"].replace(/&amp;/g, '&'),
          conditionicon: normFormat ? `${iconUrl}${curForecast["@WxIconTypeAbbrev"]}.svg` : `${iconUrl}${formatIcon(curForecast["wx_icon_text"])}.svg`,
          low: normFormat ? curForecast["Low"] : curForecast["low"],
          high: normFormat ? curForecast["High"] : curForecast["high"],
          sunrise: normFormat ? curForecast["Sunrise"] : curForecast["sunrise"],
          sunset: normFormat ? curForecast["Sunset"] : curForecast["sunset"],
          description: normFormat ? curForecast["Description"] : '',
          windspeedmin: normFormat ? curForecast["WindSpeedMin"] : curForecast["wnd_spd"],
          windspeedmax: normFormat ? curForecast["WindSpeedMax"] : curForecast["wnd_spd"],
          winddirection: normFormat ? curForecast["WindDirection"] : curForecast["wnd_dir"],
          precipitation: normFormat ? `${curForecast["Precipitation"]}%` : `${curForecast["pop"]}%`,
          extendedTitle: `Outlook for ${dateStr}`,
          precipToggle: true
        };
      if (tmpObj.precipitation === '0%'){
        tmpObj.precipitation = '';
        tmpObj.precipToggle = false;
      }
      if (i < 7){
        forecasts.push(tmpObj);
      }
    }

    this.setState({
      updated: updatedtime,
      city: currentdata["location"]["#text"],
      state: currentdata["location"]["@region"],
      conditionIcon: `http://ftpcontent.worldnow.com/griffin/gnm/testing/svg/day/${currentdata["WxIconType"]["#text"]}.svg`,
      temp: currentdata["temp"]["#text"],
      conditionText: currentdata["wx"],
      feelsLike: currentdata["apparent_temp"]["#text"],
      dew: currentdata["dewp"]["#text"],
      humidity: currentdata["rh"],
      visibility: parseInt(currentdata["visibility"]["#text"] / 5280, 10),
      windSpeed: currentdata["wnd_spd"]["#text"],
      windDirection: currentdata["wnd_dir"],
      pressure: currentdata["press"]["#text"],
      forecasts
    });

    // progressbar.js@1.0.0 version is used
    // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
    if (!window.wxGlobals.builtRadial){
      bar = new JProgressBar.SemiCircle('#radialprog', {
        strokeWidth: 2,
        color: '#fd4000',
        trailColor: '#edebeb',
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1000,
        svgStyle: null,
        text: {
          value: '',
          alignToBottom: false
        },
        from: {
          color: 'rgb(0,0,255)'
        },
        to: {
          color: 'rgb(255,0,0)'
        },
        step: (state, sBar) => {
          let iBar = sBar;
          iBar.path.setAttribute('stroke', state.color);
          let value = Math.round(iBar.value() * 100);
          if (value === 0) {
            iBar.setText('');
          } else {
            iBar.setText(value);
          }
          iBar.text.style.color = state.color;
        }
      });
      bar.text.style.fontFamily = '"Roboto", Helvetica, sans-serif';
      bar.text.style.fontSize = '2rem';
      bar.animate(barpct);  // Number from 0.0 to 1.0
      window.wxGlobals.builtRadial = true;
    } else {
      bar.animate(barpct);
    }

    if (!window.wxGlobals.eventAdded){
      jQuery('#locchange').on('click', (e) => {
        e.preventDefault();

        let firstcard = jQuery('#firstcard');
        let popuphtml = `
            <div id="zipcontainer" style="${blackbox}">
              <div id="zipbox" style="${zipbox}">
                <div id="zipinner">
                  <a id="zipclose" style="${zipclose}">X</a>
                  <span>Zip Code: </span><input type="text" style="${zipinput}" id="zipInput" maxlength="5" /> <input id="submitzip" type="submit" value="Submit" />
                </div>
              </div>
            </div>
          `;

        function changeZip(zip){
          if (zip.length === 5){
            let wxController = new WeatherController(stationID);
            wxController.getCache('currents', tmpThis.buildState, zip);
            jQuery('#zipcontainer').remove();
          }
        }

        firstcard.append(jQuery(popuphtml));
        jQuery('#zipclose').on('click', () => {
          jQuery('#zipcontainer').remove();
        });
        jQuery('#zipInput').on('keypress', (evt) => {
          if (evt.which === 13){ changeZip(jQuery('#zipInput').val()); }
        });
        jQuery('#submitzip').on('click', () => {
          changeZip(jQuery('#zipInput').val());
        });
      });
      jQuery('.forecastSection').on('click', '.detailsLink', (e) => {
        e.preventDefault();
        let forecastCont = jQuery('.forecastSection');
        let curDay = jQuery(this).parent().parent().parent();

        function buildPopover(ele){
          let popdesc = ele.attr('data-description');
          let poptitle = ele.attr('data-title');
          let popoverLeft = curDay.offset().left - forecastCont.offset().left;
          let newStyle = `left: ${(popoverLeft - 69)}px;`;
          let popuphtml = `
              <div id="popovernew" class="popovernew top" style="${newStyle}">
                <div class="arrow"></div>
                <h3 style="${popovertitle}">${poptitle}</h3>
                <div style="${popovercontent}">${popdesc}</div>
              </div>
            `;
          curDay.addClass('active');
          forecastCont.append(jQuery(popuphtml));
          forecastCont.addClass('popover_open');
        }

        if (!forecastCont.hasClass('popover_open')){
          buildPopover(jQuery(this));
        } else {
          jQuery('#popovernew').remove();
          if (!curDay.hasClass('active')){
            buildPopover(jQuery(this));
          } else {
            forecastCont.find('.active').removeClass('active');
            jQuery('.forecastSection').removeClass('popover_open');
          }
        }
      });
      window.wxGlobals.eventAdded = true;
    }

    let hourlyData = maindata['hourly']['locations']['location'];
    this.buildHourly(hourlyData);
  }

  render() {
    return (
      <div id="wxModuleMain">
        <div style={containerStyle}>
          <h2 style={h2style}>Weather Conditions and Forecast</h2>
          <div id="firstcard" className="whitecard" style={whitecard}>
            <div style={widecol}>
              <div className="currentsSection" style={currentsection}>
                <div className="left">
                  <div><span className="updated">{this.state.updated}</span></div>
                  <h3 style={h3style}>
                    Current Weather Conditions in &nbsp;
                    <a id="locchange" style={citysty} href="#loc">
                      {this.state.city}, {this.state.state}
                    </a>
                  </h3>
                  <div>
                    <div style={tempcondition}>
                      <div id="radialprog" style={radialprogsty} />
                      <span style={curwxiconbox}>
                        <img
                          src={this.state.conditionIcon}
                          style={wxiconsty}
                          alt={this.state.conditionText} />
                      </span>
                      <span style={tempsty}>
                        {this.state.temp}
                        <sup style={supstyle}>&deg;</sup>
                      </span>
                      <div style={wxcondition}>{this.state.conditionText}</div>
                    </div>
                    <div style={currentdetail}>
                      <div style={weather2item}>
                        <ul style={detailul}>
                          <li>
                            <i style={isty}>Feels Like</i>
                            <span style={toprowspan}>
                              {this.state.feelsLike}
                              <sup style={supstyle}>&deg;</sup>
                            </span>
                          </li>
                          <li>
                            <i style={isty}>Wind Speed</i>
                            <span style={bottomrowspan}>{this.state.windSpeed} mph</span>
                          </li>
                        </ul>
                      </div>
                      <div style={weather2item}>
                        <ul style={detailul}>
                          <li>
                            <i style={isty}>Dew Point</i>
                            <span style={toprowspan}>{this.state.dew}
                              <sup style={supstyle}>&deg;</sup>
                            </span>
                          </li>
                          <li>
                            <i style={isty}>Wind Direction</i>
                            <span style={bottomrowspan}>{this.state.windDirection}</span>
                          </li>
                        </ul>
                      </div>
                      <div style={weather2item}>
                        <ul style={detailul}>
                          <li>
                            <i style={isty}>Humidity</i>
                            <span style={toprowspan}>{this.state.humidity}%</span>
                          </li>
                          <li>
                            <i style={isty}>Pressure</i>
                            <span style={bottomrowspan}>{this.state.pressure} in</span>
                          </li>
                        </ul>
                      </div>
                      <div style={weather2item}>
                        <ul style={detailul}>
                          <li>
                            <i style={isty}>Visibility</i>
                            <span style={toprowspan}>{this.state.visibility} mi</span>
                          </li>
                          <li />
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right" />
              </div>
              <div className="forecastSection" style={forecastsection}>
                {this.state.forecasts.map((forecast) => {
                  let precipblock;
                  if (forecast.precipToggle) {
                    precipblock = (
                      <span>
                        <i
                          className="fa fa-umbrella"
                          style={{marginRight: '4px'}}
                          aria-hidden="true" />
                        {forecast.precipitation}
                      </span>
                    );
                  }
                  return (
                    <div style={daycast} key={forecast.id} data-day={forecast.date}>
                      <div style={dayname} className="dayname">{forecast.date}</div>
                      <div className="bottomday" style={bottomday}>
                        <div style={conditiontext}>
                          {forecast.condition}
                        </div>
                        <div style={conditionimg}>
                          <img
                            style={forecastcondicon}
                            src={forecast.conditionicon}
                            alt={forecast.condition} />
                        </div>
                        <div style={temphigh}>
                          {forecast.high}
                          <span>
                            <sup style={supstyle}>&deg;</sup>
                          </span>
                        </div>
                        <div style={templow}>
                          {forecast.low}
                          <span>
                            <sup style={supstyle}>&deg;</sup>
                          </span>
                        </div>
                        <div style={precip}>
                          {precipblock}
                        </div>
                        <div className="viewdetails">
                          <a
                            className="detailsLink"
                            style={detailslink}
                            data-title={forecast.extendedTitle}
                            data-description={forecast.description}>
                            <span>details</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="radarskycam">
                <div style={radarcontainer} className="radars">
                  <h3>Interactive Radars</h3>
                  <div style={radarsty}>
                    <a style={radaranchor} href="#radar">
                      <div style={radarimgwarn} />
                      <h4 style={radarh4}>
                        <b>{radarName}</b>
                        <span style={radaranchorspan}>Interactive Radar</span>
                      </h4>
                    </a>
                    <p style={radarpsty}>
                      With options allowing you to view conditions such as
                      rainfall, snowfall, hail, rotation, and even lightning strikes, {radarName}
                      Interactive Radar is one of the most advanced online radar tools available.
                    </p>
                  </div>
                  <div style={radarsty}>
                    <a style={radaranchor} href="#radar">
                      <div style={radarimgucontrol} />
                      <h4 style={radarh4}>
                        <b>U-Control</b>
                        <span style={radaranchorspan}>Interactive Radar</span></h4>
                    </a>
                    <p style={radarpsty}>
                      Check the weather at your house as well as anywhere in the world! Zoom in
                      to street level, or zoom out to see weather around the world. View
                      satellite info, track hurricanes, and much more.
                    </p>
                  </div>
                </div>
                <div style={skycamcontainer} className="skycam">
                  <h3>SkyCam Network</h3>
                  <div id="skycamsection" style={skycamsty} />
                </div>
                <div style={clearfix} />
              </div>
            </div>
          </div>
          <div className="rightcol" style={rightcol}>
            <div className="ad" style={ad300x250}>
              <img src="http://ftpcontent.worldnow.com/griffin/gnm/testing/wx/fakead.jpg" alt="fake ad" />
            </div>
            <div className="ad" style={ad300x250}>
              <img src="http://ftpcontent.worldnow.com/griffin/gnm/testing/wx/fakead.jpg" alt="fake ad" />
            </div>
            <div className="ad" style={ad300x250}>
              <img src="http://ftpcontent.worldnow.com/griffin/gnm/testing/wx/fakead.jpg" alt="fake ad" />
            </div>
          </div>
        </div>
        <div style={blackstrip}>
          <div>
            <h3 style={h3stylewhite}>Stay safe with the {stationName} weather app</h3>
            <div>
              <div style={blackLeft}>
                <img
                  style={blackleftimg}
                  src="http://ftpcontent.worldnow.com/griffin/gnm/testing/wx/coffeeapp.jpg"
                  alt="Download Our App" />
              </div>
              <div style={blackRight}>
                <h4 style={h4style}>
                  Weather alerts, radar, and forecast information all at the touch of a button!
                </h4>
                <p style={pstyle}>
                  Receive severe weather alerts via voice and push notification during
                  life-threatening weather events...even when the app isn&apos;t open.
                  Configure alerts for up to 5 preset locations, as well as your current
                  location, no matter where you are.  Listen to local weather forecasts
                  when you can&apos;t stop to read them. Check the radar for rain and snow,
                  anywhere, anytime. Get the daily and hourly forecasts for your preset
                  and current location.
                </p>
                <div style={phonespansty}>
                  <a
                    href={iosAppUrl}
                    style={iosbtnsty}
                    title="Download the Weather App">
                    <img
                      src="http://ftpcontent.worldnow.com/kotv/custom/apps/appstorebadge.svg"
                      alt="Apple App Store" />
                  </a>
                  <a
                    style={androidbtnsty}
                    href={androidAppUrl}
                    title="Download the Weather App">
                    <img
                      style={googlebadge}
                      src="http://ftpcontent.worldnow.com/kotv/custom/apps/google-play-badge.png"
                      alt="Google Play Store" />
                  </a> or text
                  <b>{shortcode}</b> to <b>79640</b> from your smart phone
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={containerStyle}>
          <h3 style={h3style}>Weather Almanac and Related Weather Information</h3>
          <div style={whitecard}>
            <div id="almanacContainer" style={almanacdiv}>
              <h4 style={almanach4}>Historical Climate Data for <span id="almanacLoc" /></h4>
              <div>
                <span>Currently viewing climate data for </span>
                <span style={calendarSpan}>
                  <input style={almanacinput} type="text" id="almanacDP" />
                  <i style={calendarIcon} className="fa fa-calendar" />
                </span>
              </div>

              <div id="almanacGraphContainer" className="graphcont">
                <canvas style={chartsty} id="highChart" height="200" />
                <canvas style={chartsty} id="lowChart" height="200" />
                <canvas style={chartsty} id="rainChart" height="200" />
                <canvas style={chartsnowsty} id="snowChart" height="200" />
                <div id="sizechecker" style={sizechecker} />
              </div>
            </div>
            <div style={hourlydiv}>
              <h4 style={almanach4}>24hr Temperature Data</h4>
              <div className="extwx hourly" id="hourlyForecast">
                <ul style={hourlyUL} className="tempGraph" />
              </div>
            </div>
            <div>
              <h4 style={almanach4}>Wind Prediction Chart</h4>
              <canvas id="windchart" width="628" height="180" />
            </div>
          </div>
          <div className="rightcol" style={rightcol}>
            <div className="ad" style={ad300x250}>
              <img src="http://ftpcontent.worldnow.com/griffin/gnm/testing/wx/fakead.jpg" alt="fakeimg" />
            </div>
            <div className="ad" style={ad300x250}>
              <img src="http://ftpcontent.worldnow.com/griffin/gnm/testing/wx/fakead.jpg" alt="fakeimg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default WeatherBlock;
