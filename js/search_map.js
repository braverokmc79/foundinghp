var HOSPITAL_TYPE="1";//파라미터 타입
var HOSPITAL_IMAGE="";
var CURRENT_ADDRES="";
var CURRENT_ADDRES_FIX=getCookie("CURRENT_ADDRES_FIX"); //다음 검색후 고정 주소
var SEARCH_TYPE=false;
var LATITUDE =getCookie("LATITUDE");  //현재 위치 위도
var LONGITUDE =getCookie("LONGITUDE");  //현재 위치 경도
var marker=""
var markerImage="";
var customOverlay="";
var infowindow="";

// 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
var placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}), 
    contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
    markers = [], // 마커를 담을 배열입니다
    currCategory = ''; // 현재 선택된 카테고리를 가지고 있을 변수입니다
   

// 지도와 로드뷰 위에 마커로 표시할 특정 장소의 좌표입니다 
var placePosition ="";

var overlayOn = false, // 지도 위에 로드뷰 오버레이가 추가된 상태를 가지고 있을 변수
    container = document.getElementById('container'), // 지도와 로드뷰를 감싸고 있는 div 입니다
    mapWrapper = document.getElementById('mapWrapper'), // 지도를 감싸고 있는 div 입니다
    mapContainer = document.getElementById('map'); // 지도를 표시할 div 입니다 


var    rvContainer = document.getElementById('roadview'); //로드뷰를 표시할 div 입니다


// 마커를 담을 배열입니다
//var markers = [];
var mapCenter = ""; // 지도의 중심좌표
var mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 5// 지도의 확대 레벨
 };  


// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 





//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//                              닫기가 가능한 커스텀 오버레이


// 커스텀 오버레이에 표시할 컨텐츠 입니다
// 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
// 별도의 이벤트 메소드를 제공하지 않습니다 
// var content = '<div class="wrap">' + 
//             '    <div class="info">' + 
//             '        <div class="title">' + 
//             '            카카오 스페이스닷원' + 
//             '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
//             '        </div>' + 
//             '        <div class="body">' + 
//             '            <div class="img">' +
//             '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
//             '           </div>' + 
//             '            <div class="desc">' + 
//             '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' + 
//             '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' + 
//             '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
//             '            </div>' + 
//             '        </div>' + 
//             '    </div>' +    
//             '</div>';

// 마커 위에 커스텀오버레이를 표시합니다
// 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
// var overlay = new kakao.maps.CustomOverlay({
//     content: content,
//     map: map,
//     position: marker.getPosition()       
// });

    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
// kakao.maps.event.addListener(marker, 'click', function() {
//     overlay.setMap(map);
// });


// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
function closeOverlay() {
    overlay.setMap(null);     
}


//                           //   닫기가 가능한 커스텀 오버레이 끝
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************






//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//                             현재 위치 받아오기

navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError);
function locationLoadSuccess(pos){

   // var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'; // 마커이미지의 주소입니다    
   var imageSrc = 'images/home.png'; // 마커이미지의 주소입니다    
    var imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
    var  imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);


    //console.log("현재 위치 받아오기1");
    // 현재 위치 받아오기
    LATITUDE =pos.coords.latitude;
    LONGITUDE=pos.coords.longitude;
    var currentPos = new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude);

    // console.dir(currentPos);
    // console.log(currentPos.La);
    // console.log(currentPos.Ma);

    //searchAddrFromCoords(currentPos, displayCenterInfo);
    // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
    map.panTo(currentPos);


    // 마커 생성
    marker = new kakao.maps.Marker({
        position: currentPos,
        image: markerImage // 마커이미지 설정 
    });

    // 기존에 마커가 있다면 제거
    marker.setMap(null);
    marker.setMap(map);

    // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
   var content = '<div class="customoverlay">' +
    '  <a href="#" onclick="return false;" >' +
    '    <span class="title">나의 위치</span>' +
    '  </a>' +
    '</div>';

    // 커스텀 오버레이가 표시될 위치입니다 
   var position =  new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude);

   // 커스텀 오버레이를 생성합니다
   customOverlay = new kakao.maps.CustomOverlay({
       map: map,
       position: position,
       content: content,
       yAnchor: 1 
   });
    

   mapCenter =new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude); // 지도의 중심좌표
   mapOption = {
        center: mapCenter, // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };

   // map = new kakao.maps.Map(mapContainer, mapOption); 

   // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    getAddr(pos.coords.latitude,pos.coords.longitude);
     // 지도와 로드뷰 위에 마커로 표시할 특정 장소의 좌표입니다 
   // placePosition = new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude);

};


// 주소 가져오기
function getAddr(lat,lng){
    let geocoder = new kakao.maps.services.Geocoder();

    let coord = new kakao.maps.LatLng(lat, lng);
    let callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          //  console.log("getAddr   :");
           // console.log(result[0].address.address_name);
            CURRENT_ADDRES=result[0].address.address_name;
        }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
}



function locationLoadSuccess2(x , y){

    // var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'; // 마커이미지의 주소입니다    
    var imageSrc = 'images/home.png'; // 마커이미지의 주소입니다    
    var imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
    var  imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
     // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
     markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
 
 
     //console.log("현재 위치 받아오기1");
     // 현재 위치 받아오기
     LATITUDE =x;
     LONGITUDE=y;
     var currentPos = new kakao.maps.LatLng(x,y);
 
    // console.log(x, y);
     // console.dir(currentPos);
     // console.log(currentPos.La);
     // console.log(currentPos.Ma);
 
     //searchAddrFromCoords(currentPos, displayCenterInfo);
     // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
     map.panTo(currentPos);
 
     // 마커 생성
     //console.log("기존 마커 값:");       
     try{
        // 기존에 나의위치 마커가 있다면 제거
        marker.setMap(null);
        customOverlay.setMap(null);
     }catch(e){

     }



     marker = new kakao.maps.Marker({
         position: currentPos,
         image: markerImage // 마커이미지 설정 
     });
 
 
     marker.setMap(map);
 
     // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    var content = '<div class="customoverlay">' +
     '  <a href="#" onclick="return false;" >' +
     '    <span class="title">나의 위치</span>' +
     '  </a>' +
     '</div>';
 
 
     // 커스텀 오버레이가 표시될 위치입니다 
    var position =  new kakao.maps.LatLng(x,y);
 
    // 커스텀 오버레이를 생성합니다
    customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
        yAnchor: 1 
    });
     
 
    mapCenter =new kakao.maps.LatLng(x,y); // 지도의 중심좌표
    mapOption = {
         center: mapCenter, // 지도의 중심좌표
         level: 5 // 지도의 확대 레벨
     };
 
    // map = new kakao.maps.Map(mapContainer, mapOption); 
 
 
      // 지도와 로드뷰 위에 마커로 표시할 특정 장소의 좌표입니다 
    // placePosition = new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
 
 };
 


function locationLoadError(pos){

    if(CURRENT_ADDRES_FIX==null){
        alert('위치 정보를 가져오는데 실패했습니다.');
        pop_klover();
    }else{
       locationLoadSuccess2(LATITUDE , LONGITUDE);
    }
};

// 위치 가져오기 버튼 클릭시
function getCurrentPosBtn(){
    navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError);
};

//                             현재 위치 받아오기 끝
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************




//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//                              좌표로 주소를 얻어내기


// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
    infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
// searchAddrFromCoords(map.getCenter(), displayCenterInfo);

// // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
// kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
//     searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
//         if (status === kakao.maps.services.Status.OK) {
//             var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
//             detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
            
//             var content = '<div class="bAddr">' +
//                             '<span class="title">법정동 주소정보</span>' + 
//                             detailAddr + 
//                         '</div>';

//             // 마커를 클릭한 위치에 표시합니다 
//             marker.setPosition(mouseEvent.latLng);
//             marker.setMap(map);

//             // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
//             infowindow.setContent(content);
//             infowindow.open(map, marker);
//         }   
//     });
// });

// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'idle', function() {
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
});

function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    //geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
    geocoder.coord2RegionCode(coords.La, coords.Ma, callback);         
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function paramTypeToText(paramType, returnString){
    var hospital="내과";
    HOSPITAL_TYPE=paramType;

    if(paramType=="1"){
        hospital= "내과";
    }else if(paramType=="2"){
        hospital= "치과";
    }else if(paramType=="3"){
        hospital= "내과";
    }else if(paramType=="4"){
        hospital= "이비인후과";        
    }else if(paramType=="5"){
        hospital= "한의원";
    }else if(paramType=="6"){
        hospital= "정형외과";
    }else if(paramType=="7"){
        hospital= "안과";
    }else if(paramType=="8"){
        hospital= "소아과";
    }else if(paramType=="9"){
        hospital= "산부인과";
    }else if(paramType=="10"){
        hospital= "피부과";
    }else if(paramType=="11"){
        hospital= "이비인후과";
    }else{
        hospital= "내과";
    }

    if(returnString){
        return hospital;
    }
    
    if(SEARCH_TYPE==false) {
       $("#hospital-type-"+paramType).css("background", "#2FBCDC");
       $(".mobile-hospital-type-"+paramType).css("background", "#2FBCDC");
       var src=$("#hospital-type-"+paramType).children("a").children("img").attr("src");
       HOSPITAL_IMAGE=src;
       $("#menu_wrap_hospital_img").attr("src", src);
    }


    return hospital;
}



// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
function displayCenterInfo(result, status) {


    //CURRENT_ADDRES=result[0].address_name;

    var paramSearch=paramTypeToText(getParameterByName("hospital"));
    //console.log("paramSearch : " +paramSearch);

    var keywordValue=result[0].address_name+" " +paramSearch;
    //console.log(keywordValue);

   // document.getElementById("keyword").value=keywordValue;
   
     
    //return result[0].region_2depth_name;



    // if (status === kakao.maps.services.Status.OK) {
    //     var infoDiv = document.getElementById('centerAddr');

    //     for(var i = 0; i < result.length; i++) {
    //         // 행정동의 region_type 값은 'H' 이므로
    //         if (result[i].region_type === 'H') {
    //             infoDiv.innerHTML = result[i].address_name;
    //             break;
    //         }
    //     }
    // }    
}


//                           //   좌표로 주소를 얻어내기 ------ 끝
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************



// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(map);  

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다 
contentNode.className = 'placeinfo_wrap';

// 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
// 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다 
addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

// 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
        target.addEventListener(type, callback);
    } else {
        target.attachEvent('on' + type, callback);
    }
}
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////



// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});





// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }
    

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch( keyword, placesSearchCB); 

}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    //기존 마커이미지 제거
    $(".multi-marker-div").parent("div").parent("div").remove();

    for ( var i=0; i<places.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i , places[i]), 
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, place) {
            kakao.maps.event.addListener(marker, 'mouseover', function() {
               // console.log(marker);
                //console.log(place);
               // console.log(" place :");
               // console.log(place);
                displayInfowindow(marker, place);
                //displayPlaceInfo(place);
            });


            kakao.maps.event.addListener(marker, 'click', function() {
                   // console.log("마커 클릭");
                    //displayPlaceInfo(place);
                    displayInfowindow(marker, place);
            });
         

            itemEl.onmouseover =  function () {
                displayInfowindow(marker, place);
            };

            itemEl.onmouseout =  function () {
                //infowindow.close();
            };


        })(marker, places[i]);
   
        fragment.appendChild(itemEl);


    }

    $(".multi-marker").parent("div").parent("div").parent("div").css("border", "none");
    $(".multi-marker").parent("div").parent("div").parent("div").css("width", "160px");
    $(".multi-marker").parent("div").parent("div").parent("div").css("height", "35px");
    $(".multi-marker").parent("div").parent("div").parent("div").css("border-radius", "8px");
    $(".multi-marker").parent("div").parent("div").parent("div").css("font-weight", "bold");
    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);

}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
    '<div class="info" onclick="myPanTo(\''+places.y+'\', \''+places.x+'\' )"  >' +
    '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
                 
      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, place) {


    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage ,   
        });



    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

   // console.log(place);

     // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
   if(SEARCH_TYPE==false) {

      var iwContent = '<div style="padding:6px 5px;" class="multi-marker-div"> <img src="'+HOSPITAL_IMAGE+'" style="height:23px" class="multi-marker"> ';
           iwContent += '<span style="position: relative;top: 0px;">'+place.place_name +'</span>';
           iwContent += '</div>';

       var iwPosition = new kakao.maps.LatLng(position, position); //인포윈도우 표시 위치입니다
       // 인포윈도우를 생성합니다
       var infowindow = new kakao.maps.InfoWindow({
            position : iwPosition, 
           content : iwContent 
        });
  
    
       // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
       infowindow.open(map, marker); 
     }
   
    return marker;
}


// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, place) {
    //var content = '<div style="padding:5px;z-index:1;">' + place.place_name + '</div>';
    var content="";
    if(SEARCH_TYPE){
        //검색처리 일경우
        content= '<div class="placeinfo  placeinfo-search " style="z-index:5">';               
        content += '   <a class="title" href="detail.html?url=' + place.place_url + '" target="_self" title="' + place.place_name + '">'         
        content += '<span>'+ place.place_name + '</span></a>';  

    }else{
        //병원 메뉴 클릭했을 경우
        content = '<div class="placeinfo " style="z-index:5">';               
        content += '   <a class="title" href="detail.html?url=' + place.place_url + '" target="_self" title="' + place.place_name + '">'
        content += '<img src="images/logo.png">';            
        content += '<span>'+ place.place_name + '</span></a>';   
    }
 

    if (place.road_address_name) {
        content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                    '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
    }  else {
        content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
    }  

    $('#placesList .item').mouseover(function(e){
        $('#placesList .item').css("background", "#fff");
        $(this).css("background", "aliceblue");
     });
   

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

function displayInfowindowCustom(marker, place) {
    //console.log(place);

    var content = '<div style="padding:5px;z-index:1;">' + place.place_name + '</div>';
    infowindow.setContent(content);
    infowindow.open(map, marker);
}


 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
// 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
function displayPlaceInfo (place) {
    //console.log("place.place_url  : " +place.place_url );

    var content="";

    if(SEARCH_TYPE){
        //검색처리 일경우
        content= '<div class="placeinfo placeinfo-search " style="z-index:5">';               
        content += '   <a class="title" href="detail.html?url=' + place.place_url + '" target="_self" title="' + place.place_name + '">'         
        content += '<span>'+ place.place_name + '</span></a>';  

    }else{
        //병원 메뉴 클릭했을 경우
        content = '<div class="placeinfo " style="z-index:5">';               
        content += '   <a class="title" href="detail.html?url=' + place.place_url + '" target="_self" title="' + place.place_name + '">'
        content += '<img src="images/logo.png">';            
        content += '<span>'+ place.place_name + '</span></a>';   
    }



    if (place.road_address_name) {
        content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                    '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
    }  else {
        content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
    }                
   

      infowindow.setContent(content);
      infowindow.open(map, marker);

    // contentNode.innerHTML = content;
    // placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
    // placeOverlay.setMap(map);  
}

// 각 카테고리에 클릭 이벤트를 등록합니다
function addCategoryClickEvent() {
    var category = document.getElementById('category'),
        children = category.children;

    for (var i=0; i<children.length; i++) {
        children[i].onclick = onClickCategory;
    }
}

// 카테고리를 클릭했을 때 호출되는 함수입니다
function onClickCategory() {
    var id = this.id,
        className = this.className;

    placeOverlay.setMap(null);

    if (className === 'on') {
        currCategory = '';
        changeCategoryClass();
        removeMarker();
    } else {
        currCategory = id;
        changeCategoryClass(this);
        searchPlaces();
    }
}

// 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
function changeCategoryClass(el) {
    var category = document.getElementById('category'),
        children = category.children,
        i;

    for ( i=0; i<children.length; i++ ) {
        children[i].className = '';
    }

    if (el) {
        el.className = 'on';
    } 
} 

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


// 지도를 표시하는 div 크기를 변경하는 함수입니다
function resizeMap() {
    var mapContainer = document.getElementById('map');
    mapContainer.style.width = '400px';
    mapContainer.style.height = '465px'; 
}

function relayout() {    
   // console.log("호출");
    // 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있습니다
    // 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출해야 합니다 
    // window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됩니다
    map.relayout();    
}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// 지도에 사용자 컨트롤 올리기
// 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다

// 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
function setMapType(maptype) { 
    var roadmapControl = document.getElementById('btnRoadmap');
    var skyviewControl = document.getElementById('btnSkyview'); 
    if (maptype === 'roadmap') {
        map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);    
        roadmapControl.className = 'selected_btn';
        skyviewControl.className = 'btn';
    } else {
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);    
        skyviewControl.className = 'selected_btn';
        roadmapControl.className = 'btn';
    }
}



// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}
///////////////////////// 지도에 사용자 컨트롤 올리기 end
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////






////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// 지도 위 버튼으로 로드뷰 표시하기

// 로드뷰 객체를 생성합니다 
var rv = new kakao.maps.Roadview(rvContainer); 

// 좌표로부터 로드뷰 파노라마 ID를 가져올 로드뷰 클라이언트 객체를 생성합니다 
var rvClient = new kakao.maps.RoadviewClient(); 

// 로드뷰에 좌표가 바뀌었을 때 발생하는 이벤트를 등록합니다 
kakao.maps.event.addListener(rv, 'position_changed', function() {

    // 현재 로드뷰의 위치 좌표를 얻어옵니다 
    var rvPosition = rv.getPosition();

    // 지도의 중심을 현재 로드뷰의 위치로 설정합니다
    map.setCenter(rvPosition);

    // 지도 위에 로드뷰 도로 오버레이가 추가된 상태이면
    if(overlayOn) {
        // 마커의 위치를 현재 로드뷰의 위치로 설정합니다
        marker.setPosition(rvPosition);
    }
});

// 마커 이미지를 생성합니다
var markImage = new kakao.maps.MarkerImage(
    'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png',
    new kakao.maps.Size(26, 46),
    {
        // 스프라이트 이미지를 사용합니다.
        // 스프라이트 이미지 전체의 크기를 지정하고
        spriteSize: new kakao.maps.Size(1666, 168),
        // 사용하고 싶은 영역의 좌상단 좌표를 입력합니다.
        // background-position으로 지정하는 값이며 부호는 반대입니다.
        spriteOrigin: new kakao.maps.Point(705, 114),
        offset: new kakao.maps.Point(13, 46)
    }
);

// 드래그가 가능한 마커를 생성합니다
var marker = new kakao.maps.Marker({
    image : markImage,
    position: mapCenter,
    draggable: true
});

// 마커에 dragend 이벤트를 등록합니다
kakao.maps.event.addListener(marker, 'dragend', function(mouseEvent) {

    // 현재 마커가 놓인 자리의 좌표입니다 
    var position = marker.getPosition();

    // 마커가 놓인 위치를 기준으로 로드뷰를 설정합니다
    toggleRoadview(position);
});

//지도에 클릭 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'click', function(mouseEvent){
    
    // 지도 위에 로드뷰 도로 오버레이가 추가된 상태가 아니면 클릭이벤트를 무시합니다 
    if(!overlayOn) {
        return;
    }

    // 클릭한 위치의 좌표입니다 
    var position = mouseEvent.latLng;

    // 마커를 클릭한 위치로 옮깁니다
    marker.setPosition(position);

    // 클락한 위치를 기준으로 로드뷰를 설정합니다
    toggleRoadview(position);
});

// 전달받은 좌표(position)에 가까운 로드뷰의 파노라마 ID를 추출하여
// 로드뷰를 설정하는 함수입니다
function toggleRoadview(position){
    rvClient.getNearestPanoId(position, 50, function(panoId) {
        // 파노라마 ID가 null 이면 로드뷰를 숨깁니다
        if (panoId === null) {
            toggleMapWrapper(true, position);
        } else {
         toggleMapWrapper(false, position);

            // panoId로 로드뷰를 설정합니다
            rv.setPanoId(panoId, position);
        }
    });
}

// 지도를 감싸고 있는 div의 크기를 조정하는 함수입니다
function toggleMapWrapper(active, position) {
    if (active) {

        // 지도를 감싸고 있는 div의 너비가 100%가 되도록 class를 변경합니다 
        container.className = '';

        // 지도의 크기가 변경되었기 때문에 relayout 함수를 호출합니다
        map.relayout();

        // 지도의 너비가 변경될 때 지도중심을 입력받은 위치(position)로 설정합니다
        map.setCenter(position);
    } else {

        // 지도만 보여지고 있는 상태이면 지도의 너비가 50%가 되도록 class를 변경하여
        // 로드뷰가 함께 표시되게 합니다
        if (container.className.indexOf('view_roadview') === -1) {
            container.className = 'view_roadview';

            // 지도의 크기가 변경되었기 때문에 relayout 함수를 호출합니다
            map.relayout();

            // 지도의 너비가 변경될 때 지도중심을 입력받은 위치(position)로 설정합니다
            map.setCenter(position);
        }
    }
}

// 지도 위의 로드뷰 도로 오버레이를 추가,제거하는 함수입니다
function toggleOverlay(active) {
    if (active) {
        overlayOn = true;

        // 지도 위에 로드뷰 도로 오버레이를 추가합니다
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);

        // 지도 위에 마커를 표시합니다
        marker.setMap(map);

        // 마커의 위치를 지도 중심으로 설정합니다 
        marker.setPosition(map.getCenter());

        // 로드뷰의 위치를 지도 중심으로 설정합니다
        toggleRoadview(map.getCenter());
    } else {
        overlayOn = false;

        // 지도 위의 로드뷰 도로 오버레이를 제거합니다
        map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);

        // 지도 위의 마커를 제거합니다
        //marker.setMap(null);
    }
}

// 지도 위의 로드뷰 버튼을 눌렀을 때 호출되는 함수입니다
function setRoadviewRoad() {
    var control = document.getElementById('roadviewControl');

    // 버튼이 눌린 상태가 아니면
    if (control.className.indexOf('active') === -1) {
        control.className = 'active';

        // 로드뷰 도로 오버레이가 보이게 합니다
        toggleOverlay(true);
    } else {
        control.className = '';

        // 로드뷰 도로 오버레이를 제거합니다
        toggleOverlay(false);
    }
}

// 로드뷰에서 X버튼을 눌렀을 때 로드뷰를 지도 뒤로 숨기는 함수입니다
function closeRoadview() {
    var position = marker.getPosition();
    toggleMapWrapper(true, position);
}


///////////////////////// 지도 위 버튼으로 로드뷰 표시하기 end
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////



function setCenter() {            
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888);
    
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
}

function myPanTo(latitude, longitude) {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(latitude, longitude);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
}        


function myPosition(){
    myPanTo(LATITUDE , LONGITUDE );
}



function customSearchPlaces(){
    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }
    
    var areaType= document.getElementById("search_select").value;
    if(areaType=="1"){
       // console.log("현재 접속 타입1 : " +areaType);
        if(CURRENT_ADDRES_FIX!=null && CURRENT_ADDRES_FIX!=""){
            //다음 주소에서 받아온 값이 있다면
            keyword=CURRENT_ADDRES_FIX + " " +keyword;
        }else{
            keyword = CURRENT_ADDRES + " " +keyword;
        }
        
        
    }
    
    //console.log("현재 접속 타입 2: " +areaType);
    SEARCH_TYPE=true;
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다

    //console.log("key word : " +keyword);
    ps.keywordSearch( keyword, placesSearchCB); 

    $(".hospitalMenu").css("background", "#fff");
}




window.onload=function(){

  // 키워드로 장소를 검색합니다
  var hospital= getParameterByName("hospital");
  var areaType= getParameterByName("areaType");
  
  if(hospital){
     var interval =setInterval(()=>{
     var keyword = "";
     if(areaType=="1"){
        keyword = CURRENT_ADDRES + " " +paramTypeToText(hospital , true);
    }else if(areaType=="2"){
        keyword =paramTypeToText(hospital , true);
    }
    
     if(keyword){        
       // console.log(keyword);
        SEARCH_TYPE=false;
         // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
         ps.keywordSearch( keyword, placesSearchCB); 
         clearInterval(interval); 

         document.getElementById("search_select").value=areaType
         //파라미터 제거
        // history.replaceState({}, null, location.pathname);
                
      }
    },100);

  }




}


$(function(){
 $('#menu_left .left-handle').on('click', function(){
     
		if($('#menu_wrap').is('.slide-out')){
           // console.log("1");		
            $('#menu_wrap').addClass('slide-in'); 
            $('#menu_wrap').removeClass('slide-out');
            
            setTimeout(()=>{
                $('.left-handle').removeClass('slide-out2');
                $('.left-handle').addClass('slide-in2');  
                $('.left-handle').removeClass('left-handle-img-right');
                $('.left-handle').addClass('left-handle-img-left')                   

            },300);
           
		} else {
       
            $('#menu_wrap').removeClass('slide-in');
			$('#menu_wrap').addClass('slide-out');     

            $('.left-handle').removeClass('slide-in2');
            $('.left-handle').addClass('slide-out2');                        
            $('.left-handle').removeClass('left-handle-img-left');
            $('.left-handle').addClass('left-handle-img-right'); 
		}

		/*변경사항*/
		if($('#map').attr("value") != undefined){ //지도가 아닐경우 실행안됨
			mapUpdateSize(); //map_custom
		}
});


 $(".list-custiom-li").on("click", function(){

     $(".category .hospitalMenu").toggle();
     
     var isOff=$(".category .hospitalMenu").hasClass("li-off");
     if(!isOff){       
        $(".category .hospitalMenu").addClass("li-off");
        $(".category").css("background-color", "rgb(255 255 255 / 0%)");
        $(".list-custiom-li").css("border-left", "1px solid #5e4a03 !important");

        $(".list-custiom-li a").removeClass("arrow-li-left");
        $(".list-custiom-li a").addClass("arrow-li-right");
        
     }else{
       
        $(".category .hospitalMenu").removeClass("li-off"); 
        $(".category").css("background-color", "#fff");
        $(".list-custiom-li").css("border-left", "2px solid #5e4a03 !important");


        $(".list-custiom-li a").removeClass("arrow-li-right");
        $(".list-custiom-li a").addClass("arrow-li-left");
     }
     
 });


  $(".hospitalMenu").click(function(e){
     e.preventDefault();
     var hospital=$(this).attr("data-type");
     menuLink(hospital);
  });



   $("#search_btn").on("mouseover", function(){
       $("#search_btn .fa-search path").css("color", "#2FBCDC");
   });
   $("#search_btn").on("mouseout", function(){
     $("#search_btn .fa-search path").css("color", "#fff");
   });


   

});


slickMobile();

function menuLink(hospital){

    var areaType= document.getElementById("search_select").value;

    //console.log("CURRENT_ADDRES_FIX : " +CURRENT_ADDRES_FIX);

    if(CURRENT_ADDRES_FIX!=null && CURRENT_ADDRES_FIX!=""){
       var keyword = paramTypeToText(hospital, true);
       if(areaType=="1"){
           keyword=CURRENT_ADDRES_FIX + " " +keyword;                        
       }
       
    
       //console.log("현재 접속 타입 2: " +areaType);
       SEARCH_TYPE=false;
       // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
   
      // console.log("key word : " +keyword);
       ps.keywordSearch( keyword, placesSearchCB); 
   
       
       $(".hospitalMenu").css("background", "#fff");
               
       $("#hospital-type-"+hospital).css("background", "#2FBCDC");
       $(".mobile-hospital-type-"+hospital).css("background", "#2FBCDC");
       var src=$("#hospital-type-"+hospital).children("a").children("img").attr("src");
       HOSPITAL_IMAGE=src;
       $("#menu_wrap_hospital_img").attr("src", src);
   

       document.getElementById('keyword').value="";

    }else{
       location.href="?hospital="+hospital+"&areaType="+areaType;
    }
}






//////////////////////// //////////////////////// //////////////////////// //////////////////////// //////////////////////// 
//////////////////////// //////////////////////// //////////////////////// //////////////////////// //////////////////////// 
//////////////////////// 접속지역 변경 및 슬릭 스라이드

function layerReg(){                
    if($("#sample5_address").val()==""){
        alert("현재 위치를 등록하세요.");
        return false;
    }else{
        $("#layerClose").click();
    }                
}


function sample5_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            var addr = data.address; // 최종 주소 변수

            // 주소 정보를 해당 필드에 넣는다.
            document.getElementById("sample5_address").value = addr;
            // 주소로 상세 정보를 검색
            geocoder.addressSearch(data.address, function(results, status) {
                // 정상적으로 검색이 완료됐으면
                if (status === daum.maps.services.Status.OK) {

                    var result = results[0]; //첫번째 결과의 값을 활용

                    // 해당 주소에 대한 좌표를 받아서
                    var coords = new daum.maps.LatLng(result.y, result.x);


                 $(".hospitalMenu").css("background", "#fff");       
                 locationLoadSuccess2(result.y, result.x);
                 CURRENT_ADDRES_FIX=addr;
               //  console.log("CURRENT_ADDRES_FIX : " +CURRENT_ADDRES_FIX);

                    // 지도를 보여준다.
                  //  mapContainer.style.display = "block";
                  //  map.relayout();
                    // 지도 중심을 변경한다.
                  //  map.setCenter(coords);
                    // 마커를 결과값으로 받은 위치로 옮긴다.
                   // marker.setPosition(coords)
                                   // setCookie(변수이름, 변수값, 기간);
                                   setCookie("CURRENT_ADDRES_FIX", CURRENT_ADDRES_FIX, 7);
                                   setCookie("LATITUDE", result.y, 7);
                                   setCookie("LONGITUDE", result.x, 7);

                }
            });
        }
    }).open();
}



   $('.list-group').slick({

                autoplaySpeed: 2000,
                autoplay: true,
                infinite: true,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                centerMode: true,
                focusOnSelect: true,
                responsive: [{

                        breakpoint: 1399,
                        settings: {
                            slidesToShow: 10,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    }

                    ,
                    {

                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 8,
                            slidesToScroll: 2
                        }
                    }

                    ,
                    {

                        breakpoint: 880,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 1
                        }
                    }

                    ,
                    {

                        breakpoint: 600,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1
                        }
                    }

                    ,
                    {

                        breakpoint: 575,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    }

                    ,

                    {

                        breakpoint: 350,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    }

                ]
            });    

function Mobile(){return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);}	


function slickMobile() {


    if (Mobile()) {
        $('.list-group').slick({
                autoplaySpeed: 2000,
                autoplay: true,
                infinite: true,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                centerMode: true,
                focusOnSelect: true,

            }

        );

        $("#sample5_address").css("width", "150px");
        $("#placesList").css("margin-bottom", "130px");
    } else {

        

        $('.list-group').slick({

                autoplaySpeed: 2000,
                autoplay: true,
                infinite: true,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                centerMode: true,
                focusOnSelect: true,
                responsive: [{

                        breakpoint: 1399,
                        settings: {
                            slidesToShow: 10,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    }

                    ,
                    {

                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 8,
                            slidesToScroll: 2
                        }
                    }

                    ,
                    {

                        breakpoint: 880,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 1
                        }
                    }

                    ,
                    {

                        breakpoint: 600,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1
                        }
                    }

                    ,
                    {

                        breakpoint: 575,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    }

                    ,

                    {

                        breakpoint: 350,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    }

                ]
            });    



    }



}


