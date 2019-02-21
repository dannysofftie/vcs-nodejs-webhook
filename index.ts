const repo = '~/root/app/platform-server';

import { exec } from 'child_process';
import * as http from 'http';

http.createServer(function(req, res) {
    if (req.method == 'GET') {
        res.end(JSON.stringify({ message: 'listener' }));
    }

    req.on('data', function(chunk) {
        exec('cd ' + repo + ' && git pull && pm2 reload onesha-platform');
    });

    res.end();
}).listen(5670, function() {
    console.log('Webhook listener running on port', 5670);
});
