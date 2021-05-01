const url = '../docs/Presentation.pdf';

let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageNumIsPending = null;

const scale = 1,
      canvas = document.getElementById('pdf-render')
      ctx = canvas.getContext('2d');

//Render the page
const renderPage = (num) => {

    //Get Page
    pdfDoc.getPage(num).then((page) => {
        console.log(page);
        //Set Page
        const viewport = page.getViewport({scale})
        console.log(viewport)
        canvas.height = viewport.height
        canvas.width = viewport.width
        console.log(canvas.height, canvas.width)
        const renderCtx = {
            canvasContext: ctx,
            viewport
        }

        page.render(renderCtx).promise.then(()=>{
            page.pageIsRendering = false;
            console.log('step1');
            if(pageNumIsPending !== null){
                console.log('step2')
                renderPage(pageNumIsPending);
                pageNumIsPending = null;
            }
        });

        //Output Current Page
        document.getElementById('current').textContent = num;
    })
}

//Check for pages rendering
const queueRenderPage = num =>{
    if(pageIsRendering){
        pageNumIsPending= num;
    }else{
        renderPage(num);
    }
}

//Show prev page
const showPrevPage = num =>{
    if(pageNum <= 1){
        return ;
    }
    else{
        pageNum-=1;
        queueRenderPage(pageNum);
    }
}

//Show next page
const showNextPage = num =>{
    if(pageNum == pdfDoc.numPages){
        return ;
    }
    else{
        pageNum+=1;
        queueRenderPage(pageNum);
    }
}

//Get Document 
pdfjsLib.getDocument(url).promise.then((pdf_) =>{
    pdfDoc = pdf_;
    document.querySelector('#total').textContent = pdfDoc.numPages;
    renderPage(pageNum);
})
.catch(err  => {
    alert(err);
}) ;

//add Event listener
document.getElementById('next-page').addEventListener('click', showNextPage);
document.getElementById('prev-page').addEventListener('click', showPrevPage);