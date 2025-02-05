let albumsData = [];
let albumsDataOrg = [];
let categories = [];
let basketItem = []

async function getData() {
    return await fetch('../music_data.json').then(response => response.json());
}

async function main() {
    const data = await getData();
    albumsData = data.data
    albumsDataOrg = data.data
    albums();
    caterory();
    search();
    basket();
    modalRemove();

    
}

function albums() {
    const albumBox = document.querySelector('.contents')
    albumsData.sort((prev , cur)=>{
        if(prev.release < cur.release) return 1;  
        if(prev.release > cur.release) return -1;  
    })
    albumBox.innerHTML = ``;
    albumsData.forEach((item) =>{
        const albumItemBox = document.createElement('div')
        albumItemBox.innerHTML = `
        <div class="col-md-2 col-sm-2 col-xs-2 product-grid">
        <div class="product-items">
        <div class="project-eff">
        <img class="img-responsive" src="images/${item.albumJaketImage}" alt="${item.albumName}">
        </div>
        <div class="produ-cost">
        <h5>${item.albumName}</h5>
        <span>
        <i class="fa fa-microphone"> 아티스트</i> 
        <p>${item.artist}</p>
        </span>
        <span>
        <i class="fa  fa-calendar"> 발매일</i> 
        
        <p>${item.release}</p>
        </span>
        <span>
        <i class="fa fa-money"> 가격</i>
        <p>￦${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace("원" , " ")}</p>
        </span>
        <span class="shopbtn">
        <button class="btn btn-default btn-xs">
        <i class="fa fa-shopping-cart"></i> 쇼핑카트담기
        </button>
        </span>
        </div>
        </div>
        </div>`;
        
        
        albumBox.append(albumItemBox);
    })
}

function caterory() {
    categories =  ['ALL' , ...new Set(albumsData.map((item) => item.category))]
    const categoryBox = document.querySelector('.nav'); 
    categoryBox.innerHTML = `
        <ul class="nav" id="main-menu">
	        <li class="text-center">
                <div class="search">
                    <div class="form-group input-group">
                        <input type="text" class="form-control" placeholder="앨범검색">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button"><i class="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                </div>
	    	</li>           			
        </ul>
        `;
        categories.forEach((item , index) =>{
            const categoryItemBox = document.createElement('li')
            const title = document.querySelector('.col-md-12 h2')
            title.textContent = 'ALL'
            
            categoryItemBox.innerHTML = `
            <a href="#" class = "${index === 0 ? 'active-menu' : ''}"}"><i class="fa ${index === 0 ? 'fa-th-list' : 'fa-youtube-play'}  fa-2x"></i> <span>${item}</span></a>
            `
            categoryBox.append(categoryItemBox)
            categoryItemBox.addEventListener('click',(e) =>{
                removeListClass();
                selectIndex = e.currentTarget
                categoryItemBox.innerHTML = `
            <a href="#" class = "${selectIndex.textContent === categoryItemBox.textContent ? 'active-menu': ''}"><i class="fa ${index === 0 ? 'fa-th-list' : 'fa-youtube-play'} fa-2x"></i> <span>${item}</span></a>
            `;
            const filteredAlbums = albumsData.filter((album) => album.category === item);
            if(item === 'ALL'){
                albumsData = albumsDataOrg
                title.textContent = 'ALL'
            }else{
                albumsData = filteredAlbums;
                title.textContent = e.currentTarget.textContent
            }
            
            
            albums();
            basket();
            albumsData = albumsDataOrg;
        })
        
    })
}

function removeListClass() {
    const $liA = document.querySelectorAll('.nav li a');
    console.log($liA);
    $liA.forEach((ele) =>{
        ele.classList.remove('active-menu')
    })
}

function search() {
    const searchBox = document.querySelector('.text-center')
    const searchInput = searchBox.querySelector('.form-control')
    console.log(searchInput);
    searchInput.addEventListener('keydown' , (e)=>{
        if(e.keyCode == 13){
            searchData()
        }
    })
    const searchIcon = searchBox.querySelector('.btn')
    console.log(searchIcon);
    searchIcon.addEventListener('click' , ()=>{
        searchData();
    })
}

// function searchData(){
//     const searchBox = document.querySelector('.text-center')
//     const searchInput = searchBox.querySelector('.form-control')
//     if(searchInput.value == ''){
//         alert('검색어를 입력하세요')
//     }else{
//         console.log(albumsData.category);
//     }
// }
function searchData() {
    const searchBox = document.querySelector('.text-center');
    const searchInput = searchBox.querySelector('.form-control');
    
    if (searchInput.value === '') {
        alert('검색어를 입력하세요');
    }
    
    const searchValue = searchInput.value.toLowerCase();
    
    const filteredAlbums = albumsDataOrg.filter(album => 
        album.albumName.toLowerCase().includes(searchValue) || album.artist.toLowerCase().includes(searchValue)
    );



    albumsData = filteredAlbums;
    

    albums();

    if (albumsData.length === 0) {
        alert('검색 결과가 없습니다.');
    }
}


function basket() {
    const add = document.querySelectorAll('.shopbtn')
    
    let number = 1
    const totalNum = document.querySelector('strong')
    totalNum.innerHTML = `<strong>0</strong>`
    add.forEach((e)=>{
        e.addEventListener('click' , ()=>{
            e.innerHTML = `
            <button class="btn btn-default btn-xs">
            <i class="fa fa-shopping-cart"></i> 추가하기 (${number++} 개)
            </button>`
            totalNum.innerHTML = `<strong>${number-1}</strong>`
        })
        e.addEventListener('click', () => {
            const albumItem = e.closest('.product-items'); // 클릭한 앨범 아이템
            const albumData = {
                albumName: albumItem.querySelector('h5').textContent,
                artist: albumItem.querySelector('.fa-microphone + p').textContent,
                release: albumItem.querySelector('.fa-calendar + p').textContent,
                price: albumItem.querySelector('.fa-money + p').textContent.replace('￦', '').trim(),
                albumImage: albumItem.querySelector('img').src.split('/').pop() // 앨범 자켓 이미지
            };
            console.log(albumData);

            basketItem.push(albumData);
            updateBasketData(basketItem)
        })
    })

    function updateBasketData(basketItem) {
        const modalList = document.querySelector('tbody')
        modalList.innerHTML = ``

        basketItem.forEach((item , index) =>{
            const modalItem = document.createElement('tr')

            modalItem.innerHTML = `
                <td class="albuminfo">
                    <img src="images/${item.albumImage}">
                    <div class="info">
                        <h4>${item.albumName}</h4>
                        <span>
                            <i class="fa fa-microphone"> 아티스트</i> 
                            <p>${item.artist}</p>
                        </span>
                        <span>
                            <i class="fa  fa-calendar"> 발매일</i> 
                            <p>${item.release}</p>
                        </span>
                    </div>
                </td>
                <td class="albumprice">
                    ￦ ${item.price}
                </td>
                <td class="albumqty">
                    <input type="number" class="form-control" value="${number-1}">
                </td>
                <td class="pricesum">
                    ￦ ${item.price}
                </td>
                <td>
                    <button class="btn btn-default">
                        <i class="fa fa-trash-o"></i> 삭제
                    </button>
                </td>
            `;
            const totalPriceBox = document.querySelector('.totalprice')
            let totalprice = 0
            totalPriceBox.innerHTML = `
                <h3>총 합계금액 : <span>￦${totalprice += item.price}</span> 원</h3>
            `


            const remove = modalItem.querySelector('.btn')
            remove.addEventListener('click' , ()=>{
                basketItem.splice(index , 1)
                updateBasketData(basketItem)
            })
            modalList.append(modalItem)
        })
        console.log(basketItem);
    }

}
function modalRemove () {
    const modalList = document.querySelector('tbody')
    modalList.innerHTML = ``
}

main();