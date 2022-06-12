// / require('dotenv').config();
const express = require("express");
var mysql = require('mysql');
const cors = require("cors");
const { query } = require('express');
const app = express();
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: true }));
app.use(cors());
const jwt = require("jsonwebtoken");


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'dana@1234',
  database : 'social_portal'
});
connection.connect();



const author = (req, res, next) => {
    const token =  req.body?req.body.token:null;
    if(!token){
        //console.log("need token!")
        res.send("Need a token");
    }
    else{
        jwt.verify(token, "Hello", (error, decoded) => {
            if(error){
                //console.log("Verification Failed");
                res.json("VF")
            }
            else {
                //console.log(req.body.userId)
                if(req.body.userId !== decoded.id) res.json("VF");
                //console.log("Done");
                //console.log(req.body)
                next();
            }
        })
    }
}









app.get('/', (req, res) => {
    res.send('Server Running');
});

app.post('/login',(req, res) => {
    const userId = req.body.userId;
    const password = req.body.password;
    // //console.log(userId, password);
    const query = `SELECT * FROM sign_in WHERE user_id = '${userId}' AND password = '${password}'`;
    connection.query(query, (error, results) => {
        if (error) {
            //console.log(error);
            res.send("Error");
        }
        else {
            if (results.length > 0) {
                const token = jwt.sign({ id: userId }, 'Hello');
                res.json({
                    token: token,
                    userId: userId
                });
            }
            else {
                res.send("Invalid Credentials");
            }
        }
    });
});



app.post('/signup', (req, res) => {
    const { username, password, email, phone_number } = req.body;
    connection.query(`INSERT INTO sign_in (user_id, password, email, phone_number) VALUES ('${username}', '${password}', '${email}', '${phone_number}')`, (err, result) => {
        if(err){
            //console.log(err);
            res.send("Error");
        }
        else {
            connection.query(`INSERT INTO users (user_id) VALUES ('${username}');`, (err, result) => {
                if (err) {
                    //console.log(err);
                    res.send("Error");
                }
                else {
                    const token = jwt.sign({ id: username },"Hello");
                    res.json({ username, token });
                };
            });
            // res.send("Error");        
        }
    })
});

app.post('/editprofile', async (req, res) => {
    // //console.log(req.body)
    const data = req.body.user;
    // //console.log(data);
    var c = 0;// update with each query run
    for (var x in data) {
        if (x !== 'userId' && x!== 'token' ) {            
             connection.query(`UPDATE users SET ${x} = '${data[x]}' WHERE user_id = '${data.userId}';`, (err, result) => {
                if (err) {
                    //console.log(err);
                    res.send("Error");
                }
                else {
                    // //console.log("123")
                    c++;
                    // //console.log(c)
                }
            });
        }
    }
    //console.log(c)
    res.json("Success");
});

app.post("/showprofile", (req, res) => {
    const userId = req.body.userId;
    connection.query(`SELECT * FROM users WHERE user_id = '${userId}'`, (err, result) => {
        if (err) {
            //console.log(err);
            res.send("Error");
        }
        else {
            //console.log(result)
            res.json(result);
        }
    });
})


app.post('/requestqwer', (req, res) => {
    const userId = req.body.userId;
    //console.log(userId);
    const query = `SELECT allie_id, name from requests,users WHERE requests.user_id = '${userId}' AND requests.allie_id = users.user_id;`;
    connection.query(query, (err, result) => {
        if (err) {
            //console.log(err);
            res.send("Error");
        }
        else {
            //console.log("***************************************************", result);
            const id = result[0].allie_id;
            const query = `select * from users where user_id = '${id}';`;
            connection.query(query, (err, result) => {
                if(err) {
                    //console.log(err);
                    res.send("Error");
                }
                else{
                    //console.log(query, result);
                    res.send(result);
                }
            })
            // res.send(result);
        }
    });
});

app.post('/request', (req, res) => {
    const userId = req.body.userId;
    //console.log(userId);
    const query = `SELECT a.allie_id, b.name, b.profile_pic from requests as a,users as b WHERE a.user_id = '${userId}' AND a.allie_id = b.user_id;`;
    var a = []
    connection.query(query, (err, result) => {
        if (err) {
            //console.log(err);
            res.send("Error");
        }
        else {
            // //console.log(result);
            res.send(result);
            
        }
    });
    // //console.log("ppppppppppppppppppppp", a);
    //console.log(query);
});

app.post('/allies', (req, res) => {
    const userId = req.body.userId;
    //console.log("*", userId);
    const query = `SELECT a.allie_id, b.name, b.profile_pic, b.user_id from allies as a,users as b WHERE a.user_id = '${userId}' AND a.allie_id = b.user_id;`;
    connection.query(query, (err, result) => {
        if (err) {
            //console.log(err);
            res.send("Error");
        }
        else {
            // //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", result);
            res.send(result);
        }
    });
});


app.post("/sendrequest", (req, res) => {
    const userId = req.body.userId;
    const allieId = req.body.allieId;
    const q1 = `SELECT name, profile_pic from users WHERE users.user_id = '${userId}'`
    // const profile_pic = 
    const query = `INSERT INTO requests (user_id, allie_id) VALUES ('${userId}', '${allieId}');`;
    connection.query(query, (err, result) => {
        if (err) {
            //console.log(err);
            res.send("Error");
        }
        else {
            res.send("Success");
        }
    });
    // //console.log(userId, allieId);
});

app.post("/acceptrequest", (req, res) => {
    const userId = req.body.userId;
    const allieId = req.body.allieId;
    const query = `INSERT INTO allies (user_id, allie_id) VALUES ('${userId}', '${allieId}');`;
    connection.query(query, (err, result) => {
        if (err) {
            //console.log(err);
            res.send("Error");
        }
        else {
            const query2 = `DELETE FROM requests WHERE user_id = '${userId}' AND allie_id = '${allieId}';`;
            connection.query(query2, (err, result) => {
                if (err) {
                    //console.log(err);
                    res.send("Error");
                }
                else {
                    res.send("Success");
                }
            });
        }
    });
});


app.post("/deleterequest", (req, res) => {
    const userId = req.body.userId;
    const allieId = req.body.allieId;
    const query = `DELETE FROM requests WHERE user_id = '${userId}' AND allie_id = '${allieId}';`;
    connection.query(query, (err, result) => {
        if (err) {
            //console.log(err);
            res.send("Error");
        }
        else {
            res.send("Success");
        }
    });
});

app.post('/posts', (req, res) => {
    const userId = req.body.userId;
    //console.log(userId);
    const query = `SELECT * from posts WHERE user_id = '${userId}';`;
    connection.query(query, (err, result) => {
        if (err) {
            ////console.log(err);
            res.send("Error");
        }
        else {
            //console.log("ABBBBBBBBBBBBBA", result);
            res.send(result);
        }
    });
});


app.post('/addpost', (req, res) => {
    const userId = req.body.data.userId;
    const postReact = {
        'likes': []
    };
    const postPhoto = req.body.data.postPhoto;
    const postText = req.body.data.postText;
    // //console.log(req.body);
    const postId = req.body.postId;
    const arr = [];
    const arrToStr = JSON.stringify(arr);
    const query = `INSERT INTO posts (user_id, post_react, post_photo, post_text) VALUES ('${userId}', '${arrToStr}', '${postPhoto}', '${postText}');`;
    connection.query(query, (err, result) => {
        if (err) {
            //console.log(err);
            res.send("Error");
        }
        else {
            const q1 = `INSERT INTO likes (post_id) VALUES `
            res.send("Success");
        }
    });
});

app.post("/deletepost", (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;
    const query = `DELETE FROM posts WHERE user_id = '${userId}' AND post_id = '${postId}';`;
    connection.query(query, (err, result) => {
        if (err) {
            //console.log(err);
            res.send("Error");
        }
        else {
            res.send("Success");
        }
    });
});



app.post('/home', (req, res) => {
    const query = `select u.name, u.profile_pic, p.* from users as u, posts as p where u.user_id=p.user_id order by post_id desc;`;
    connection.query(query, (err, result) => {
        if (err) {
            //console.log(err);
            res.send("Error");
        }
        else {
            res.send(result);
        }
    });
});








// app.post('/admin', (req, res) => {
// });

// app.post('/compaints', (req, res) => {
// });

app.post("/search", (req, res) => {
    const search = req.body.search;
    //console.log("ksjddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd", search);
    const query = `SELECT * from users WHERE name LIKE '%${search}%';`;
    connection.query(query, (err, result) => {
        if (err) {
            //console.log(err);
            res.send("Error");
        }
        else {
            //console.log("*******************&&&&&&&&&&&&************************************", result);
            res.send(result);
        }
    });
})
    
// app.post("/addReact",(req,res)=>{
//     const id = req.body.postId;
//     const query = `SELECT * from posts where post_id='${id}';`;
//     connection.query(query, (err, result) => {
//         if (err) {
//             //console.log(err);
//             res.send("Error");
//         }
//         else {
//             //console.log(result);
//             const arr = result[0].post_react;
//             const json = JSON.parse(arr);
//             json.push(req.body.allie_id);
//             const arr2 = JSON.stringify(json);
//             const query = `UPDATE posts SET post_react = '${arr2}' WHERE post_id = '${req.body.post_id}';`;
//             connection.query(query, (err, result) => {
//                 if (err) {
//                     //console.log(err);
//                     res.send("Error");
//                 }
//                 else {
//                     res.send("Success");
//                 }
//             });
//         }
//     })
// })

app.post("/checkLike", (req, res) => {
    const postId = req.body.postId;
    const query = `SELECT * from posts WHERE post_id = ${postId};`;
    //console.log(query);
    connection.query(query, (err, result) => {
        if (err) {
            //console.log(err);
            res.send("Error");
        }
        else {
            //console.log("oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo", result);
            var arr = result[0].post_react;
            var arr2 = JSON.parse(arr);
            //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", arr);
            var arr3;
            var l = arr2.length;
            if (!arr2.includes(req.body.userId) || arr2.length === 0) {
                arr2.push(req.body.userId);
            }
            else {
                arr2.splice(arr2.indexOf(req.body.userId), 1);
            }
            var arr4 = JSON.stringify(arr2);
            const query2 = `UPDATE posts SET post_react = '${arr4}' WHERE post_id = '${postId}';`;
            connection.query(query2, (err, result) => {
                if (err) {
                    //console.log(err);
                    res.send("Error");
                }
                else {
                    var msg;
                    if(arr2.length > l){
                        msg = '+';
                    }
                    else if(arr2.length < 1){
                        msg = '-';
                    }
                    else{
                        msg = '=';
                    }
                    res.send({msg: msg, status: "Success"});
                }
            });
        }
    })
});

app.post('/admin', (req, res) => {
    const userId = req.body.admin;
 const password = req.body.password;
 //console.log("ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhj");
 //console.log(userId, password);
 const query = `SELECT * FROM admin WHERE admin = ${userId} AND password = '${password}'`;
 connection.query(query, (error, results) => {
     if (error) {
         //console.log(error);
         res.send("Error");
     }
     else {
         if (results.length > 0) {
             const token = jwt.sign({ id: userId }, 'Hello');
             res.json({
                 token: token,
                 userId: userId
             });
         }
         else {
             res.send("Invalid Credentials");
         }
     }
 });

});

app.post('/complaints', (req, res) => {
 const postId = req.body.postId;
 const complaint = req.body.complaint;
 //console.log("hdvsbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb ");
 const query = `INSERT INTO complaints (post_id, complaint) VALUES (${postId}, '${complaint}');`;
 connection.query(query, (err, result) => {
     if (err) {
         //console.log(err);
         res.send("Error");
     }
     else {
         res.send("Success");
     }
 });
});
 
app.post("/showcompaints", (req, res) => {
 if (req.body.admin !== 777) res.send("ERROR")
 const query = `SELECT * from compaints;`;
 connection.query(query, (err, result) => {
     if (err) {
         //console.log(err);
         res.send("Error");
     }
     else {
         res.send(result);
     }
 }
 )
}
);

app.post("/deletepost", (req, res) => {
 const postId = req.body.postId;
 const query = `DELETE FROM posts WHERE post_id = '${postId}';`
 connection.query(query, (err, result) => {
     if (err) {
         //console.log(err);
         res.send("Error");
     }
     else {
         res.send("Success");
     }
 });
});

app.post("/deletecompaint", (req, res) => {
 const compaintId = req.body.compaintId;
 const query = `DELETE FROM compaints WHERE compaint_id = '${compaintId}';`
 connection.query(query, (err, result) => {
     if (err) {
         //console.log(err);
         res.send("Error");
     }
     else {
         res.send("Success");
     }
 });
});

app.post("/deletepostfromcomplaint", (req, res) => {
 if (req.body.admin !== 777) res.send("ERROR")
 const postId = req.body.postId;
 const query = "DELETE FROM compaints WHERE post_id = '${postId}';";
 connection.query(query, (err, result) => {
     if (err) {
         //console.log(err);
         res.send("Error");
     }
     else {

         connection.query(query, (err, result) => {
             if (err) {
                 const query = `DELETE FROM posts WHERE post_id = '${postId}';`
             }
             else {
                 res.send("Success");
             }
         }
         )
     };
 });
});

//Listening on port 5000
app.listen(process.env.PORT || 5000, () => {
    console.log("Running on port 5000");
});