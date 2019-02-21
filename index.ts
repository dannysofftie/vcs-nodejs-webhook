const repo = '~/root/app/platform-server';

import { exec } from 'child_process';
import * as http from 'http';

http.createServer(function(req, res) {
    if (req.method == 'GET') {
        res.end(JSON.stringify({ message: 'listener' }));
    }

    req.on('data', function(chunk) {
        console.log('Incoming pull payload');
        exec('cd ' + repo + ' && git pull && pm2 reload onesha-platform', err => {
            if (err) {
                console.log('Error occured ', err);
            }
            console.log('Pull complete');
        });
    });
    res.end();
}).listen(5670, function() {
    console.log('Webhook listener running on port', 5670);
});
