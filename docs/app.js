# app.js
cat > docs/app.js <<'JS'
(function(){
  document.querySelectorAll('.copy').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const code = btn.parentElement.querySelector('code').innerText;
      navigator.clipboard.writeText(code).then(()=>{
        const t = btn.innerText; btn.innerText = 'Copied!'; setTimeout(()=>btn.innerText=t,1200);
      });
    });
  });
})();
JS
