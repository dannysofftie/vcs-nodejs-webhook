import { spawn } from 'child_process';
import * as http from 'http';

http.createServer(function(req, res) {
    if (req.method == 'GET') {
        res.end(JSON.stringify({ message: 'listener' }));
    }

    req.on('data', function(chunk) {
        console.log('Incoming pull payload');
        const pull = spawn('sh', ['pull-changes.sh'], {
            cwd: '~/app/vcs-nodejs-webhook',
        });
        pull.on('error', err => {
            console.log('Error ', err);
        });
    });

    res.end();
}).listen(5670, function() {
    console.log('Webhook listener running on port', 5670);
});
