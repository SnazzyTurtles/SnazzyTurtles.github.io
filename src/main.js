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
        if(this.name == "resume"){
            window.open("Harry Jiang Resume.pdf", '_blank');
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

var rena = 0
var pics = 0

var ready = false;
var root = new Folder("home");
root.parent = root;
var curFolder = root;
const previousCommands = [""];
var commandIndex = 0;

var about = new Folder("about"); root.addFolder(about);
    about.addFile(new File("bio", "Hi, my name is Harry! I'm a third year Statistics student at the University of Waterloo. <br>" +
    "I'm passionate about data, technology, and finance, and I'm always looking for new opportunities to learn<br>" +
    "and grow. Hope you enjoy my website! :3"));
    about.addFile(new File("contacts", 
        "Email: <a href=mailto:h262jian@uwaterloo.ca target=_blank>h262jian@uwaterloo.ca</a><br>" + 
        "LinkedIn: <a href=https://www.linkedin.com/in/harryjiang7/ target=_blank>https://www.linkedin.com/in/harryjiang7/</a><br>" + 
        "Github: <a href=https://github.com/SnazzyTurtles target=_blank>https://github.com/SnazzyTurtles</a><br>" + 
        "Phone: 604-880-9303"));
    about.addFile(new File("education", 
        "University of Waterloo (2021-2026)<br>- Bachelor of Statistics, Dual Minor in Combinatorics & Optimization and Economics<br>" + 
        "- Ronald G. Scoin/Rene Descartes National Scholarship ($18,000)"));
    about.addFile(new File("skills", 
        "Languages: Python, R, Java, C, C++, C, JavaScript, Racket, HTML/CSS, SQL<br>" + 
        "Technologies: Git, Node.js, .NET, HTTP, SQL, VS<br>" + 
        "Relevant Coursework: Data Structures and Algorithms, Functional Programming, Data Abstraction, <br>" +
        "Computer Organization and Design, Logic and Computation, Object-Oriented Programming, Linear Algebra, <br>" +
        "Data and Statistical Analysis, Combinatorial Optimization, Sequential Programming, Numerical Computation, <br>" +
        "Stochastic Processes"));
    var hobbies = new Folder("hobbies"); about.addFolder(hobbies);
        hobbies.addFile(new File("poker", "I'm deeply interested in poker for both it's simplicity yet insanely high level of complexity.<br>" +
        "I have been playing for quite a few years now, casually with friends, as a side hustle both online and<br>" +
        "in-person, and in many competitive settings such as part of the Waterloo poker club."));
        hobbies.addFile(new File("sports", "I've grown up playing almost every sport imaginable, with some notable ones being:<br>" +
        "Hockey - for 13 years in both competitive (AAA) and recreational leagues, even being voted as team captain<br>" +
        "Basketball - played for 6 years on a mix of rep and house teams, and continuing to play to this day<br>" +
        "Kickboxing - trained throughout all of highschool, unfortunately never got to compete due to COVID<br>" +
        "Ultimate Frisbee - only started playing in university, but it's probably one of my favourite sports today<br>" +
        "Dodgeball - playing casually but as team captain for an intramural team in university<br>" +
        "Badminton - played for 2 years on my highschool team, and continue to play recreationally today"));
        hobbies.addFile(new File("speedcubing", "I started solving Rubik's cubes back in 2009, and while I was originally just a casual solver, over the<br>" +
        "years I've become more involved on the competitive side of things, having competed in 9 competitions to date.<br>" +
        "My (unofficial) personal bests for my main events are:<br>" +
        "3x3: 6.28 single, 8.77 Ao5<br>" +
        "4x4: 27.05 single, 32.29 Ao5<br>" +
        "5x5: 59.19 single, 1:04.14 Ao5<b>"));
        hobbies.addFile(new File("photography", "While I always loved taking photos, I was able to pick up a camera at the start of university<br>" +
        "and I've been pursuing casual landscape photography since. You can find some of my best works hidden in this<br>" +
        "website or check me out at <a href=https://www.instagram.com/snazzypictures7/ target=_blank>@SnazzyPictures7</a> (dedicated photography portfolio coming soon :3)."));
var experience = new Folder("experience"); root.addFolder(experience);
    experience.addFile(new File("2024-janestreet", 
        "Jane Street Capital: Quantitative Trader || May 2024 - August 2024<br>" + 
        "- Will be attending Jane Street’s summer internship program in New York City as a Quantitative Trader;<br>" +
        "learning about financial tools and theory, participating in frequent mock trading games, shadowing full-time<br>" + 
        "traders, and working closely with a trading desk to build out an end of term project to be used by the traders."));
    experience.addFile(new File("2023-accutar", 
        "Accutar Biotech: Software Researcher || September 2023 - Dec 2023<br>" + 
        "- Used a combination of computational geometry, supervised and semi-supervised machine learning, optimization<br>" +
        "theory, and combinatorial optimization to improve drug-protein interaction analysis improving efficiency<br>" +
        "by up to 30%.<br>" + 
        "- Built an imperative performance benchmarking platform that helped reduce efficiency tests by over 50%"));
    experience.addFile(new File("2023-artemis", 
        "Artemis Data: Software Engineer || Jan 2023 - Apr 2023<br>" + 
        "- Rigorously designed and implemented a novel back-end cataloging and syncing system for data organization and<br>" +
        "navigation. Reduced front-end user load times by over 99% and decreased back-end load by over 90%.<br>" + 
        "- Engaged directly with customers and investors as product manager; responsible for envisioning, planning,<br>" +
        "implementing, and marketing new features and changes to boost overall interest and quality of the product.<br>" +
        "- Built up a crucial full-stack admin support application for monitoring and managing customer organization<br>" +
        "accounts, reducing new-customer onboarding time by over 75% and drastically decreasing user-support times."));
    experience.addFile(new File("2022-moneris", 
        "Moneris Solutions: Data Engineer || May 2022 - Aug 2022<br>" + 
        "- Worked extensively with SQL databases, structuring and scripting to improve data efficiency and reliability.<br>" +
        "Have processes running on over 1 billion monthly data points, improving efficiency over previous systems by<br>" +
        "up to 90%.<br>" +
        "- Utilized specialized automation and data pipelining tools such as ActiveBatch and SSMS to run jobs and<br>" +
        "monitor daily performance metrics through improved auditing techniques.<br>" +
        "- Created several new scripts and methods for automating and streamlining future job creation and<br>" +
        "implementation, greatly improved reliability, and improved human implementation efficiency by over 75%."));
root.addFile(new File("resume", ""));
// root.addFile(new File("credits", "Website design and concept by Arthur Bright: <a href=https://github.com/arthurbright/arthurbright.github.io target=_blank>source</a>"));
// this should be gone now
// root.addFile(new File("linkedin", "LinkedIn: <a href=https://www.linkedin.com/in/harryjiang7/ target=_blank>https://www.linkedin.com/in/harryjiang7/</a>"));

var secret = new Folder("secret"); root.addFolder(secret);
secret.addFile(new File("top-secret.txt", "Type 'pics' to see a random cool photo :3<br>" +
"or type 'game' to play a 'mental' arithmetic game!"));




function append(str){
    fixed.innerHTML = fixed.innerHTML + str;
    consbox.scrollTop = consbox.scrollHeight;
}

function getPrefix(){
    return '<span class=green>hjiang@my-website</span>:<span class="blue">' + curFolder.path + '</span>$&nbsp;'
}

function setHeader(){
    header.innerHTML = 'hjiang@my-website:&nbsp;' + curFolder.path + ''
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
    "██╗░░██╗░█████╗░██████╗░██████╗░██╗░░░██╗=" +
    "██║░░██║██╔══██╗██╔══██╗██╔══██╗╚██╗░██╔╝=" +
    "███████║███████║██████╔╝██████╔╝░╚████╔╝░=" +
    "██╔══██║██╔══██║██╔══██╗██╔══██╗ ░╚██╔╝░░=" +
    "██║░░██║██║░░██║██║░░██║██║░░██║░░░██║░░░=" +
    "╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░=" + 
    "░░░░░██╗██╗░█████╗░███╗░░░██╗░██████╗░░░░=" +
    "░░░░░██║██║██╔══██╗████╗░░██║██╔════╝░░░░=" +
    "░░░░░██║██║███████║██╔██╗░██║██║░░███╗░░░=" +
    "██░░░██║██║██╔══██║██║╚██╗██║██║░░░██║░░░=" +
    "╚█████╔╝██║██║░░██║██║░╚████║╚██████╔╝░░░=" +
    "░╚════╝░╚═╝╚═╝░░╚═╝╚═╝░░╚═══╝░╚═════╝░░░░="; 

    if(window.innerWidth < 550){
        s = 
        "█░█░▄▀█░█▀█░█▀█░█▄█=" +
        "█▀█░█▀█░█▀▄░█▀▄░░█░=" +
        "░░█░█░▄▀█░█▄░█░█▀▀░=" +
        "█▄█░█░█▀█░█░▀█░█▄█░=";
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
    else if(arr[0] == "pics"){
        window.open("images/pics" + pics + ".jpg", '_blank');
        pics = (pics + 1) % 11;
    }
    else if(arr[0] == "game"){
        window.open("easy/app.html", '_blank');
    }
    else if(arr[0] == "mental"){
        window.open("hard/app.html", '_blank');
    }
    else if(arr[0] == "rena"){
        window.open("images/rena" + rena + ".jpg", '_blank');
        rena = (rena + 1) % 5;
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

