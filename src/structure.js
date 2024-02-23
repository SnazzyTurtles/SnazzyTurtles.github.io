class Folder{
    constructor(name){
        this.name = name;
        this.subfolders = [];
        this.files = [];
        this.path = "/" + name;
    }

    addFolder(folder){
        this.subfolders.push(folder);
        folder.path = this.path + "/" + folder.name;
    }

    addFile(file){
        this.files.add(file);
    }

    toString(){
        all = []
        for(file in files){
            all.push(file);
        }
        for(subfolder in subfolders){
            all.push(subfolder);
        }

        all.sort((a, b) => {
            return a.name.localeCompare(b.name);
        })

        res = ""
        for(f in all){
            res += f.name.padStart(10);
        }
        return res + "<br>";
    }
}

class File{
    constructor(name, content){
        this.name = name;
        this.content = content;
    }
}

