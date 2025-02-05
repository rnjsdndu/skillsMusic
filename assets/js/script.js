// category 가져오는법
// 1. 먼저 데이터에 모든 데이터를 가져와서 속성 category를 추출 한다
// 2. 배열을 유익한 값만 있도록 가공을 한다.
// 3. 사이드바에 추가를 해서 메인 콘텐츠를 필터링 할수 있도록 만든다
const nav = document.querySelector('.nav');
const $contents = document.querySelector('.contents');
let categoies = [];
let albums = []; // 오리지널(원조)
let filteredAlbums = []; // 필터링 결과가 담긴 앨범
let selectIndex = 0;
// json 파일에서 데이터 가져오는 함수
async function getData() {
    return await fetch('./music_data.json').then(response => response.json());
} //재사용 하기 위해 getData라는 함수로 만들어줌


async function main() {
    const data = await getData(); //json 데이터를 가져옴
    albums = data.data; //data배열
    filteredAlbums = data.data; //data배열
    categoies = ['ALL', ...new Set(albums.map((item) => item.category))]; //albums.map((item) => item.category) => albums(data배열)배열에서 각 항목(item)의 category값을 추출하여 새로운 배열을 만든다
                                                                          //new Set() 중복된 카테고리를 제거하여 고유한 값만 남김 (그렇지 않으면 400개의 중복된 카테고리 데이터가 출력됨)//Set을 사용하기 위해선 앞에 꼭 new가 있어야함
                                                                          //['ALL', ...new Set()] ALL이라는 문자열을 맨 앞에 추가 하여 최종배열을 만든다 //ALL이 추가되는 이유는 category영역에서 ALL이벤트를 추가하기 위해 삭제함
    renderAlbum(); //renderAlbum함수를 선언함
    renderCategory(); //renderCategory함수를 선언함

    

    // // const names = [{ name: 'a'}, { name: 'b'}, { name: 'c'}, { name: 'd'}, { name: 'e'}, ]
    // // console.log(names);
    // // map은 배열 안에 오브젝트들이 담겨져있고 오브젝트 속에 키와 밸류값이 있다

    // // console.log(names.map((item) => item.name)); // map안에 값을 하나하나씩 가져오려면 이렇게 하면 됨


    // // console.log(new Set([1,2,3,4,2,1,2,1,11,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1,1,22,222,222,22,22,1]));
    // //Set은 중복된 값을 하나로 만들어준다, Set을 쓰려면 new가 꼭 있어야한다
    
    // const Adata = data.data
    // console.log(data.data.map((item) => item.category));
    // console.log(data.data.filter((item) =>{
    //     return item.category === '발라드'
    // }).map((item) => item.category));



//     const modalOpen = document.querySelector('.btn')
//     const modal = document.querySelector('.modal-dialog')
//     // console.log(modal);
//     // console.log(modalOpen);
//     modalOpen.addEventListener('click' , ()=>{

//     })
}




// 앨범 리스트를 그려주는 함수
function renderAlbum() { //기능마다 함수로 나눠서 재사용 할 수 있게 만든다
    $contents.innerHTML = ''; //처음에 나오는 샘플 앨범 2개 제거

    //앨범들 내림차순으로 정렬                                                                                                      //참고    https://guiyomi.tistory.com/121
    filteredAlbums.sort((prev, cur) => { //sort는 callback함수를 쓸수 있다. callback함수는 두개의 매개변수를 받아 prev가 cur보다 작다면 -1을 반환하고 크다면 1을 반환한다
        if (prev.release < cur.release) return 1; //prev = {"release" : 2018.05.16} cur = {"release : 2019.03.24"} 
        //prev.release보다 cur.release보다 작으면 1을 반환하여 숫자를 바꾼다 이로인해 값이 큰 것이 앞쪽으로 이동한다 //반환된 1은 정렬 기준을 나타낸다 
        if (prev.release > cur.release) return -1;
        //    0: 순서 유지.
        //  < 0: prev가 앞에 위치.
        //  > 0: prev가 뒤에 위치.
    }); 

    filteredAlbums.forEach((element) => { //데이터를 한번씩 돌면서 코드 실행
        const $albumElement = document.createElement('div'); //$albumElement에 createElement로 div요소를 만들어 준다
        $albumElement.innerHTML = `
         <div class="col-md-2 col-sm-2 col-xs-2 product-grid">
            <div class="product-items">
                    <div class="project-eff">
                        <img class="img-responsive" src="images/${element.albumJaketImage}" alt="Time for the moon night">
                    </div>
                <div class="produ-cost">
                    <h5>${element.albumName}</h5>
                    <span>
                        <i class="fa fa-microphone"> 아티스트</i> 
                        <p>${element.artist}</p>
                    </span>
                    <span>
                        <i class="fa  fa-calendar"> 발매일</i> 
                            
                        <p>${element.release}</p>
                    </span>
                    <span>
                        <i class="fa fa-money"> 가격</i>
        
                        <p>￦${element.price.replace("원", "")}</p>
                    </span>
                    <span class="shopbtn">
                        <button class="btn btn-default btn-xs">
                            <i class="fa fa-shopping-cart"></i> 쇼핑카트담기
                        </button>
                    </span>
                </div>
            </div>
        </div>`;//만든 div요소에 innerHTML로 앨범을 집어넣어줌 //element 는 filteredAlbum 배열에 있는 각 객체를 참조한다
        $contents.append($albumElement); //innerHTML로 넣은 $albumElement를 append로 $contents에 넣어준다
    });
}


// 카테고리 리스트를 그려주는 함수
function renderCategory() {
    const liList = nav.querySelectorAll('li'); // HTML상에 있는 nav(위에 선언해줌)속 모든 li태그를 가져옴

    //categoies.forEach를 돌기 전 nav안에 있는 li는 총 3개, 로고와 input ALL이다 ALL을 제거하기 위해 사용 //제거 이유: 이벤트를 걸기위해
    [...liList].forEach((ele) => { //...(스프레드 연산자)으로 liList를 개별 요소로 펼치고 []로 배열로 만들어 준다 //ele은 liList 즉 li를 뜻함
        if (!ele.classList.contains('text-center')) { //만약 ele의 클래스에 text-center가 포함되어(contains) 있다면 //contains는 해당 문자열에 특정 문자열()이 포함되어 있다면 true 그렇지 않으면 false를 반환한다
            ele.remove();//ele(li)를 지워라
        }
    });


    // [보기] categoies = ['ALL', ...new Set(albums.map((item) => item.category))];
    
    categoies.forEach((value, index) => { //value는 배열의 현재 요소를 뜻함 ex)ALL,발라드 //index는 배열의 인덱스 위치를 뜻함 ex)ALL의 인덱스는 0 , 발라드의 인덱스는 1
        const $li = document.createElement('li'); //#li 에 createElement로 li를 만듬
        //만든 li에 innerHTML로 만든다
        $li.innerHTML = ` 
        <a href="#" class="${selectIndex === index ? 'active-menu' : ''}">
        <i class="fa ${index === 0 ? 'fa-th-list' : 'fa-youtube-play'} fa-2x"></i> 
        <span class="value">${value}</span>
        </a>
        `;//selectIndex(선택된 인덱스)가 index와 동일하다면 a태그에 active-menu가 추가되고 그렇지 않다면 ''가 추가된다(삼항 연산자) //클래스를 추가하는 이유: nav에 카테고리가 선택되면 이벤트를 주기 위해
        //(ALL이 첫번째에 있기때문에 사용 가능) //index의 위치가 0이라면 fa-th-list클래스를 추가하고 그렇지 않다면 fa-youtube-play클래스를 추가한다
        //현재 돌고있는 요소를 span태그에 나타냄
        nav.append($li); //li를 추가할 부모요소(nav)에 li를 넣음
        // console.log($li);
        
        $li.addEventListener('click', (e) => { //li를 클릭하면
            console.log('click');//클릭이라는 콘솔로그를 출력함
            selectIndex = index;//selectIndex는 index(forEach의 두번째 매개변수)
            
            const category = e.currentTarget.querySelector('.value').textContent; //e의 currentTarget(이벤트가 실제로 연결된 요소(li)를 가리킴)아래 value라는 클래스를 가지고 있는 요소에 textContent(해당 HTML요소의 텍스트 부분을 반환)를 반환한다
            
            // [보기]albums = data.data;
            // filter()함수에서 아래코드처럼 arrow함수를 사용해서 조건문만 적을시 자동으로 item 반환
            const fillingData = albums.filter((item) => item.category === category);//albums에 item(data배열)이 카테고리라는key값이 category(value라는 클래스의 textContent)와 동일한것
            
            
            // [보기]let filteredAlbums = []; // 필터링 결과가 담긴 앨범
            filteredAlbums = fillingData; //*filteredAlbums = fillingData;는 fillingData에 담긴 필터링된 앨범 배열을 filteredAlbums에 할당하는 구문입니다. 이를 통해 filteredAlbums는 현재 선택된 카테고리에 맞는 앨범들을 담고 있으며, 이 배열을 바탕으로 앨범들이 화면에 표시됨
            
            renderAlbum();//렌더링된 앨범을 재선언
            renderCategory(); //렌더링된 카테고리를 재선언
        });
    });
    
}




main();//최종적으로 모든 함수가 선언된 main함수를 선언함