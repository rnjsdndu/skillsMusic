// category 가져오는법
// 1. 먼저 데이터에 모든 데이터를 가져와서 속성 category를 추출 한다
// 2. 배열을 유익한 값만 있도록 가공을 한다.
// 3. 사이드바에 추가를 해서 메인 콘텐츠를 필터링 할수 있도록 만든다




async function main() {
    const data = await fetch('./music_data.json').then(response => response.json());
    const albums = data.data;
    
    // console.log(albums);
    const $contents = document.querySelector('.contents');
    $contents.innerHTML = '';

    albums.forEach((element) => {

        // console.log(element.artist)

        const $albumElement = document.createElement('div');
        // 가격형식 - 쉽표와 "원" 이라는 단어 제거
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
                        </div>`;

        $contents.append($albumElement)
        // $albumElement.style.display = 'none'
    });

    // const names = [{ name: 'a'}, { name: 'b'}, { name: 'c'}, { name: 'd'}, { name: 'e'}, ]
    // console.log(names);
    // map은 배열 안에 오브젝트들이 담겨져있고 오브젝트 속에 키와 밸류값이 있다

    // console.log(names.map((item) => item.name)); // map안에 값을 하나하나씩 가져오려면 이렇게 하면 됨


    // console.log(new Set([1,2,3,4,2,1,2,1,11,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1,1,22,222,222,22,22,1]));
    //Set은 중복된 값을 하나로 만들어준다, Set을 쓰려면 new가 꼭 있어야한다
    
    // const Adata = data.data
    // console.log(data.data.map((item) => item.category));
    // console.log(data.data.filter((item) =>{
    //     return item.category === '발라드'
    // }).map((item) => item.category));






    const nav = document.querySelector('.nav');
    const categoies = [...new Set(albums.map((item) => item.category))];


    categoies.forEach((value) => {
        const $li = document.createElement('li');
        $li.innerHTML = `
            <a href="#"><i class="fa fa-youtube-play fa-2x"></i> <span class="value">${value}</span></a>
        `;
        
        nav.append($li);

        // console.log(newCategory);

        $li.addEventListener('click', (e) => {
            const category = e.currentTarget.querySelector('.value').textContent;
            // console.log(category);
            // const fillingData = albums.map((item) => {
            //     if (item.category === category) {
            //         // console.log(item);
            //         return item;
            //     }
            // }).filter((item) => item);


            const sample1 = albums.filter((item) => {
                if (item.category === category) {
                    return item;
                }
            });
            // filter()함수에서 아래코드처럼 arrow함수를 사용해서 조건문만 적을시 자동으로 item 반환
            const fillingData = albums.filter((item) => item.category === category);


            console.log(sample1);
            // console.log(fillingData);
            
            // if(e.target.textContent === value) {
            //     const newAlbum = document.createElement('div')
            //     newAlbum.innerHTML =
            //     console.log(data.data.filter((item) =>item.category === value).map((item) => item.category)); 
            // }
        });
    });





    const modalOpen = document.querySelector('.btn')
    const modal = document.querySelector('.modal-dialog')
    // console.log(modal);
    // console.log(modalOpen);
    modalOpen.addEventListener('click' , ()=>{

    })


}

main();