import * as fs from "fs";

class Exercise {
  public static way1(fileName: string, cb: (data: string) => void): void {
    //creating text.txt
    fs.writeFile(fileName, "Hello", (err) => {
      fs.readFile(fileName, "utf-8", (err, data) => {
        if (err) throw err;
        console.log(data);
        fs.appendFile(fileName, " There", (err) => {
          if (err) throw err;
          fs.readFile(fileName, "utf-8", (err, data) => {
            if (err) throw err;
            console.log(data);
            cb(data);
            fs.unlink(fileName, (err) => {
              if (err) throw err;
            });
          });
        });
      });
    });
  }

  public static way2(fileName: string, cb: (data: string) => void): void {
    try {
      fs.writeFileSync(fileName, "Hello", "utf-8");
      const data = fs.readFileSync(fileName, "utf-8");
      console.log(data);
      fs.appendFileSync(fileName, " There", "utf-8");
      const newData = fs.readFileSync(fileName, "utf-8");
      console.log(newData);
      cb(newData);
      fs.unlinkSync(fileName);
    } catch (err) {}
  }

  public static createFilePromise(fileName: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      fs.writeFile(fileName, "hello", "utf-8", (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  public static appendFilePromise(fileName: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      fs.appendFile(fileName, " There", (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  public static readFilePromise(fileName: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(fileName, "utf-8", (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
  public static deleteFilePromise(fileName: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      fs.unlink(fileName, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
  public static promisify<T>(
    func: (...args: any[]) => void
  ): (...args: any[]) => Promise<T> {
    return (...args: any[]) => {
      return new Promise<T>((resolve, reject) => {
        func(...args, (err: any, result: T) => {
          if (err) reject(err);

          resolve(result);
        });
      });
    };
  }
}

const doExerciseWithPromiseChain = () => {
  Exercise.createFilePromise("test.txt")
    .then(() => {
      return Exercise.readFilePromise("test.txt");
    })
    .then((data) => {
      console.log(data);
      return Exercise.appendFilePromise("test.txt");
    })

    .then(() => {
      return Exercise.readFilePromise("test.txt");
    })
    .then((data) => {
      console.log(data);
      return Exercise.deleteFilePromise("test.txt");
    })
    .catch((err) => {
      console.log(err);
    });
};

const doExerciseWithAsync = async () => {
  try {
    await Exercise.createFilePromise("test.txt");
    const data = await Exercise.readFilePromise("test.txt");
    console.log(data);
    await Exercise.appendFilePromise("test.txt");
    const data1 = await Exercise.readFilePromise("test.txt");
    console.log(data1);
    await Exercise.deleteFilePromise("test.txt");
  } catch (err) {
    console.log(err);
  }
};

Exercise.way1("text.txt", (data) => {
  console.log(data, "result data");
});

Exercise.way2("zaali.txt", (data) => {
  console.log(data, "meore");
});

// dont run doExerciseWithPromiseChain(); and doExerciseWithAsync(); same time.

// doExerciseWithPromiseChain();
doExerciseWithAsync();

const promisedFunc = Exercise.promisify(fs.writeFile);

promisedFunc("myPromise.txt", "hello").then((data) => {
  console.log(data);
});
