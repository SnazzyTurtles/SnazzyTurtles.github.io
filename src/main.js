function pad(str, len){
    // for(let i = str.length; i < len; i ++){
    //     str = str + "&nbsp;"
    // }
    for(let i = 0; i < len; i ++){
        str = str + "&nbsp;";
    }
    return str;
}

class Folder{
    constructor(name){
        this.name = name;
        this.subfolders = [];
        this.files = [];
        this.path = name;
        this.parent = undefined;
    }

    addFolder(folder){
        this.subfolders.push(folder);
        folder.path = this.path + "/" + folder.name;
        folder.parent = this;
    }

    addFile(file){
        this.files.push(file);
    }

    toString(){
        var all = [];
        for(let file of this.files){
            all.push(file);
        }
        for(let subfolder of this.subfolders){
            all.push(subfolder);
        }

        all.sort((a, b) => {
            return a.name.localeCompare(b.name);
        })

        var res = ""
        var width = 3;
        if(this.parent) res += "<span class='blue'>" + pad("../", width) + "<\span>";
        for(let f of all){
            if(f instanceof Folder){
                res += "<span class='blue'>" + pad(f.name + "/", width) + "<\span>";
            }
            else{
                res += "<span class='aqua'>" + pad(f.name, width) + "<\span>";
            }
        }
        return res;
    }
}

class File{
    constructor(name, content){
        this.name = name;
        this.content = content;
    }

    getContent(){
        if(this.name == "RESUME"){
            window.open("Arthur-Bright-Resume.pdf", '_blank');
            return undefined;
        }
        else{
            return this.content;
        }
    }
}

function getFolder(ostr, getf=false){
    str = ostr;
    if(str.startsWith("/") || str.startsWith("\\")){
        str = "home" + str;
    }
    else{
        str = curFolder.path + "/" + str;
    }
    let arr = str.split(/\/|\\/).filter((x) => {return x != ""});
    
    cur = root;
    for(let i = 1; i < arr.length; i ++){
        if(i == arr.length - 1 && getf){
            for(let file of cur.files){
                if(file.name == arr[i]){
                    return file;
                }
            }
            return undefined;
        }


        if(arr[i] == ".") continue;
        if(arr[i] == ".."){
            if(cur.parent){
                cur = cur.parent;
                continue;
            }
            else{
                return undefined;
            }
        }

        found = false;
        for(let sub of cur.subfolders){
            if(sub.name == arr[i]){
                found = true;
                cur = sub;
                break;
            }
        }
        if(found) continue;
        return undefined;
    }
    return cur;
}

function getFile(ostr){
    return getFolder(ostr, true);
}


const cons = document.getElementById("console")
const fixed = document.getElementById("fixedtext")
const consbox = document.getElementById("consolebox")
const prefix = document.getElementById("prefix")
const header = document.getElementById("header");
const ENTER = 13;
const UP = 38;
const DOWN = 40;

var ready = false;
var root = new Folder("home");
root.parent = root;
var curFolder = root;
const previousCommands = [""];
var commandIndex = 0;

var about = new Folder("about"); root.addFolder(about);
    about.addFile(new File("bio", "Hi, my name is Arthur Bright! I'm a third year Computer Science Student at University of Waterloo.<br>" + 
    "I love making music and singing in the shower. I'm also into anything math (especially competitions :D)."));
    about.addFile(new File("contacts", 
        "Email: <a href=mailto:artb1234567@gmail.com target=_blank>artb1234567@gmail.com</a><br>" + 
        "LinkedIn: <a href=https://www.linkedin.com/in/a2bright/ target=_blank>https://www.linkedin.com/in/a2bright</a><br>" + 
        "Github: <a href=https://github.com/arthurbright target=_blank>https://github.com/arthurbright</a><br>" + 
        "Instagram: <a href=https://www.instagram.com/artb_64 target=_blank>@artb_64</a><br>" + 
        "Phone: 519-465-7304"));
    about.addFile(new File("education", 
        "University of Waterloo (2021-2026)<br>- Candidate for Bachelor of Computer Science<br>- 99.3 Faculty Average, 98 Overall Average; Advanced level math/CS courses<br>" + 
        "- Putnam Top 200<br>- UW Small C champion"));
    about.addFile(new File("skills", 
        "Languages: C++, Python, Java, C#, JS/TS, HTML/CSS<br>" + 
        "Technologies: Git, Node.js, .NET, HTTP, SQL, VS, Tensorflow"));
    var hobbies = new Folder("hobbies"); about.addFolder(hobbies);
        hobbies.addFile(new File("music", "I've often said that if I wasn't into tech, then music would be my top career choice.<br><br>" + 
            "In past years, I've been really getting into music theory and mixing. I've uploaded a bunch of covers on my " + 
            "primary instagram <a href=https://www.instagram.com/artb_64 target=_blank>@artb_64</a>, and also hundreds of piano covers where I " + 
            "play by ear on my second account <a href=https://www.instagram.com/c_major._/ target=_blank>@c_major._</a>.<br><br>" + 
            "I primarily play piano; I completed RCM 10, but I mainly play pop songs these days. I also played a variety of woodwind instruments in middle school."));
        hobbies.addFile(new File("sports", "I play basketball, ultimate frisbee, and I swim. I've also started bouldering recently, and I try to go every week. Hit me up if you wanna send some sends :)"));
        hobbies.addFile(new File("math", "I was a huge math nerd in high school (and still am :D). I particularly enjoyed writing math contests, " + 
            "and often ranked in Canada's top 30. I am a two-time CMO qualifier and recently achieved top 200 in the Putnam.<br><br>" + 
            "I enjoy any logical problems/puzzles; shoot me with your best shot >:)"));
var projects = new Folder("projects"); root.addFolder(projects);
    projects.addFile(new File("multipiano", "A multiplayer piano! Built with Node.js + Socket.<br>" +
        "Try it out: <a href=https://multipiano.glitch.me/ target=_blank>https://multipiano.glitch.me/<\a> (might take a sec to load)<br>" + 
        "Source: <a href=https://github.com/arthurbright/Multipiano target=_blank>https://github.com/arthurbright/Multipiano<\a>"));
    projects.addFile(new File("spectral", "Neural network that identifies musical chords from audio samples using spectrogram (WIP). Built with Python + Tensorflow/Keras.<br>" +
        "Source: <a href=https://github.com/arthurbright/Spectral target=_blank>https://github.com/arthurbright/Spectral<\a>"));
    projects.addFile(new File("hotspot", "Crowd-sourced web app that tracks COVID-19 spread on a heatmap. Made with Node.js + React + MongoDB + Google Maps. Winner at Garuda Hacks 2020<br>" + 
        "Source: <a href=https://github.com/thesilican/garudahacks-2020 target=_blank>https://github.com/thesilican/garudahacks-2020<\a>"));
    projects.addFile(new File("sbotify", "Music downloader, like Spotify, but for free! Built with Node.js.<br>" + 
        "Source: <a href=https://github.com/arthurbright/Soundtrack-downloader target=_blank>https://github.com/arthurbright/Soundtrack-downloader<\a>"));
    projects.addFile(new File("manhunt", "A web app for friends to play manhunt! Run around and hide on campus. Built with Node.js + Socket<br>" + 
        "Try it out: <a href=https://manhunt.glitch.me/ target=_blank>https://manhunt.glitch.me/<\a> (might take a sec to load)<br>" + 
        "Source: <a href=https://github.com/arthurbright/Manhunt target=_blank>https://github.com/arthurbright/Manhunt<\a>"));
    projects.addFile(new File("my-website", "This website! Source: <a href=https://github.com/arthurbright/arthurbright.github.io target=_blank>https://github.com/arthurbright/arthurbright.github.io<\a>"));
    projects.addFile(new File("remind", "A discord bot for scheduling and recieving reminders.<br>" + 
        "Source: <a href=https://github.com/arthurbright/Re-mind target=_blank>https://github.com/arthurbright/Re-mind<\a>"));
    projects.addFile(new File("graph.io", "A graph visualizer! Draw a graph and run some common graph algorithms on it. Built with Unity.<br>" + 
        "Try it out: <a href=https://simmer.io/@afur/graph-io target=_blank>https://simmer.io/@afur/graph-io<\a> (might take a sec to load)<br>" + 
        "Source: <a href=https://github.com/arthurbright/Graph.io target=_blank>https://github.com/arthurbright/Graph.io<\a>"));
    projects.addFile(new File("portal2d", "A 2D version of the popular game Portal. Comes with 15 challenging levels. Built with Unity.<br>" + 
        "Game files: <a href=https://github.com/arthurbright/Portal2D target=_blank>https://github.com/arthurbright/Portal2D<\a>"));
var experience = new Folder("experience"); root.addFolder(experience);
    experience.addFile(new File("2023-bloomberg", 
        "Bloomberg LP: Software Engineer || Aug 2023 - Dec 2023<br>" + 
        "- Researched semantic graph storage and pathfinding performance<br>" + 
        "- Developed service to cache and retrive ontology graph paths, greatly improving response time."));
    experience.addFile(new File("2023-questrade", 
        "Questrade: Softare Engineer || Jan 2023 - Apr 2023<br>" + 
        "- Developed new API endpoints for a market data microservice using Nest.js, allowing users to make batch requests of security data<br>" + 
        "- Implemented data preprocessing and safety checks to prevent microservice errors/outages<br>" + 
        "- Identified and fixed 30+ production bugs in trading platform, including memory leaks"));
    experience.addFile(new File("2022-imagine", 
        "Imagine Communications: Backend Developer || May 2022 - Aug 2022<br>" + 
        "- Developed a robust HTTP client in .NET for communicating with Amazon S3 cloud storage<br>" + 
        "- Optimized PostgreSQL connections by strategically pruning idle connections, improving performance tenfold"));
root.addFile(new File("RESUME", ""));

var secret = new Folder("secret"); root.addFolder(secret);
for(let i = 2; i < 2; i ++){
    let s = new Folder("secret" + i.toString());
    secret.addFolder(s);
    secret = s;
}
secret.addFile(new File("top-secret.txt", "THERE ARE INFINITELY MANY TWIN PRIMES<br>Type 'piano' to play a piano.<br>Also, type 'cats' to see a random picture of my cats, Lulu and Percy :3"));




function append(str){
    fixed.innerHTML = fixed.innerHTML + str;
    consbox.scrollTop = consbox.scrollHeight;
}

function getPrefix(){
    return '<span class=green>a2bright@my-website</span>:<span class="blue">' + curFolder.path + '</span>$&nbsp;'
}

function setHeader(){
    header.innerHTML = 'a2bright@my-website:&nbsp;' + curFolder.path + ''
}

async function slowText(str){
    const mod = 4;
    let cnt = 0;
    for(c of str){
        if(cnt == mod - 1){
            await new Promise(r => setTimeout(r, 1));
        }
        if(c == "=") append("<br>");
        else append(c);
        cnt = (cnt + 1) % mod;
    }
}

async function startup(){
    setHeader();
    await new Promise(r => setTimeout(r, 100));
    append("<span class='yellow'> Starting up... <\span><br><br>");
    await new Promise(r => setTimeout(r, 800));
    s = 
    "░█████╗░██████╗░████████╗██╗░░██╗██╗░░░██╗██████╗=" + 
    "██╔══██╗██╔══██╗╚══██╔══╝██║░░██║██║░░░██║██╔══██╗=" + 
    "███████║██████╔╝░░░██║░░░███████║██║░░░██║██████╔╝=" + 
    "██╔══██║██╔══██╗░░░██║░░░██╔══██║██║░░░██║██╔══██╗=" + 
    "██║░░██║██║░░██║░░░██║░░░██║░░██║╚██████╔╝██║░░██║=" + 
    "╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝░╚═════╝░╚═╝░░╚═╝=" + 
        "██████╗░██████╗░██╗░██████╗░██╗░░██╗████████╗=" + 
        "██╔══██╗██╔══██╗██║██╔════╝░██║░░██║╚══██╔══╝=" + 
        "██████╦╝██████╔╝██║██║░░██╗░███████║░░░██║░░░=" + 
        "██╔══██╗██╔══██╗██║██║░░╚██╗██╔══██║░░░██║░░░=" + 
        "██████╦╝██║░░██║██║╚██████╔╝██║░░██║░░░██║░░░=" + 
        "╚═════╝░╚═╝░░╚═╝╚═╝░╚═════╝░╚═╝░░╚═╝░░░╚═╝░░░=";

    if(window.innerWidth < 550){
        s = 
        "▄▀█ █▀█ ▀█▀ █░█ █░█ █▀█=" + 
        "█▀█ █▀▄ ░█░ █▀█ █▄█ █▀▄==" + 
        "█▄▄ █▀█ █ █▀▀ █░█ ▀█▀=" + 
        "█▄█ █▀▄ █ █▄█ █▀█ ░█░==";
    }

    await slowText(s);

    await new Promise(r => setTimeout(r, 100));
    append("<span class='yellow'>Type 'help' to see a list of commands<br><br>");
    await new Promise(r => setTimeout(r, 500));

    ready = true;
    prefix.innerHTML = getPrefix();
}
startup()

function error(str){
    append("<span class='red'>" + str + "<\span><br>");
}

function processCommand(str){
    previousCommands.splice(previousCommands.length - 1, 0, str);
    commandIndex = 0;
    let arr = str.split(" ").filter((x) => {return x != ""});
    append(getPrefix() + str + "<br>");
    if(arr.length == 0){
        //do nothing
    }
    else if(arr[0] == "ls"){
        if(arr.length == 1){
            append(curFolder.toString() + "<br>");
        }
        else if(arr.length == 2){
            folder = getFolder(arr[1]);
            if(folder) append(folder.toString() + "<br>");
            else error(arr[1] + ": Not a directory >:(");
        }
        else{
            error('Usage: ls [directory]');
        }
    }
    else if(arr[0] == "cd"){
        if(arr.length == 2){
            folder = getFolder(arr[1]);
            if(folder) curFolder = folder;
            else error(arr[1] + ": Not a directory >:("); 
            prefix.innerHTML = getPrefix();
            setHeader();
        }
        else{
            error('Usage: cd &lt;director&gt;');
        }
    }
    else if(arr[0] == "cat"){
        if(arr.length == 2){
            file = getFile(arr[1]);
            if(file){
                let s = file.getContent();
                if(s) append("<span class='yellow'>" + file.getContent() + "<br> <\span>");
            }
            else error(arr[1] + ": Not a file >:(");
        }
        else{
            error('Usage: cat &lt;file-path&gt;');
        }
    }
    else if(arr[0] == "cats"){
        let r = Math.floor(Math.random() * 11);
        window.open("images/cats" + r + ".jpg", '_blank');
    }
    else if(arr[0] == "piano"){
        let r = Math.floor(Math.random() * 11);
        window.open("piano/room.html", '_blank');
    }
    else if(arr[0] == "help"){
        var s = "This website is based on the linux terminal. There are four simple commands:<br>" +
        "&nbsp;&nbsp;cat &lt;file-path&gt;: View the contents of a file.<br>" + 
        "&nbsp;&nbsp;cd &lt;directory&gt;: Change the current directory.<br>" + 
        "&nbsp;&nbsp;help: Display information about commands.<br>" + 
        "&nbsp;&nbsp;ls [directory]: List the contents of a directory, or the current directory if no argument is provided.<br><br>" + 
        "You can also use the up/down arrow keys to autofill previous commands. <br>";
        append("<span class='yellow'>" + s + "<br> <\span>");
    }
    else{
        error(str + ": Unrecognized command! :(");
    }

}

cons.onkeydown = e => {
    if(!ready){
        e.preventDefault();
        return;
    }


    if ((e.keyCode && e.keyCode == ENTER) || (e.charCode && e.charCode == ENTER)){
        processCommand(cons.value);
        cons.value = "";
        e.preventDefault();
    }
    else if ((e.keyCode && e.keyCode == UP) || (e.charCode && e.charCode == UP)){
        commandIndex += 1;
        if(commandIndex < 0){
            commandIndex = 0;
            e.preventDefault();
            return;
        }
        if(commandIndex >= previousCommands.length){
            commandIndex = previousCommands.length - 1;
            e.preventDefault();
            return;
        }
        if(commandIndex < previousCommands.length && commandIndex >= 0){
            cons.value = previousCommands[previousCommands.length - 1 - commandIndex];
        }
        e.preventDefault();
    }
    else if ((e.keyCode && e.keyCode == DOWN) || (e.charCode && e.charCode == DOWN)){
        commandIndex -= 1;
        if(commandIndex < 0){
            commandIndex = 0;
            cons.value = "";
            e.preventDefault();
            return;
        }
        if(commandIndex >= previousCommands.length){
            commandIndex = previousCommands.length - 1;
            e.preventDefault();
            return;
        }
        if(commandIndex < previousCommands.length && commandIndex >= 0){
            cons.value = previousCommands[previousCommands.length - 1 - commandIndex];
        }
        e.preventDefault();
    }
};

