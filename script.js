function(){
  var MAX=15, todos=[], nextId=1, W={High:3,Medium:2,Low:1};
  var quotes=[
    "A clear list is a clear mind. Add your first task and let's begin!",
    "Nothing here yet, and that's a fresh start. What will you conquer today?",
    "Big things begin with one small task. Type it in!",
    "Your future self is waiting. Give them something to be proud of."
  ];
  var $=function(id){return document.getElementById(id)};
  var quote=quotes[Math.floor(Math.random()*quotes.length)];

  function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt)e.textContent=txt;return e}

  function row(t){
    var li=el('li',t.done?'done':'');
    var cb=el('input');cb.type='checkbox';cb.checked=t.done;cb.setAttribute('aria-label','Mark complete');
    cb.onchange=function(){t.done=cb.checked;render()};
    var x=el('button','x','\u00D7');x.setAttribute('aria-label','Delete');
    x.onclick=function(){todos=todos.filter(function(a){return a.id!==t.id});render()};
    li.append(cb,el('span','t',t.text),el('span','tag '+t.pri,t.pri),x);
    return li;
  }

  function render(){
    var n=todos.length, open=todos.filter(function(t){return !t.done}), done=todos.filter(function(t){return t.done});
    $('open').replaceChildren();$('done').replaceChildren();
    open.forEach(function(t){$('open').append(row(t))});
    done.forEach(function(t){$('done').append(row(t))});
    if(!open.length)$('open').append(el('li','empty','Nothing pending.'));
    if(!done.length)$('done').append(el('li','empty','Finished tasks land here.'));

    $('count').textContent=n+' / '+MAX+' tasks';
    $('left').textContent=n>=MAX?'List full':(MAX-n)+' slot'+(MAX-n===1?'':'s')+' left';
    $('bar').style.width=(n/MAX*100)+'%';

    var full=n>=MAX;
    $('txt').disabled=full;$('pri').disabled=full;$('btn').disabled=full;
    $('txt').placeholder=full?'List is full, finish or delete a task':'What needs doing?';

    var m;
    if(n===0)m=quote;
    else if(n>=MAX)m="That's 15. The list is closed, so no more tasks. Go finish what's here!";
    else if(n===14)m="14 tasks! You've planned plenty. Take a breath, rest, and pace yourself.";
    else m="Steady progress: "+done.length+" done, "+open.length+" to go.";
    $('msg').textContent=m;

    var pick=open.slice().sort(function(a,b){return W[b.pri]-W[a.pri]||a.id-b.id})[0];
    $('rec').hidden=!pick;
    if(pick)$('recT').textContent=pick.text+' ('+pick.pri+' priority)';
  }

  $('f').onsubmit=function(e){
    e.preventDefault();
    var v=$('txt').value.trim();
    if(!v||todos.length>=MAX)return;
    todos.push({id:nextId++,text:v,pri:$('pri').value,done:false});
    $('txt').value='';$('txt').focus();
    render();
  };
  render();
};
