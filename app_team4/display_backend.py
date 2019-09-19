###############################################################################
#
# The MIT License (MIT)
#
# Copyright (c) Crossbar.io Technologies GmbH
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#
###############################################################################

import os

from autobahn.twisted.component import Component, run

# display_component = Component(
#     transports=os.environ.get('XBR_INSTANCE', u'ws://localhost:8080/ws'),
#     realm=os.environ.get('XBR_REALM', u'realm1')
# )
DEFAULT_AUTHID = 'team4'
DEFAULT_TICKET = 'knife23 fork spoon cutlery'

TOPIC = 'com.conti.hackathon.team4.backend'
SERVICE_NAME = 'simple seller python example service'
SERVICE_TYPE = 'backend'

display_component = Component(
    transports=os.environ.get('XBR_INSTANCE', 'wss://continental2.crossbario.com/ws'),
    realm=os.environ.get('XBR_REALM', 'realm1'),
    authentication={
        'ticket': {
            'authid': os.environ.get('XBR_AUTHID', DEFAULT_AUTHID),
            'ticket': os.environ.get('XBR_TICKET', DEFAULT_TICKET),
            'authextra': {
                'service_name': SERVICE_NAME,
                'type': SERVICE_TYPE,
            },
        },
    }
)



@display_component.on_join
async def joined(session, _details):
    data = None

    def get_distance():
        return data

    def on_car_data(self, car_data):
        print("Got event: {}".format(car_data))
        nonlocal data
        data = car_data

    def book():
        return  "someone interested (departure time )/ the parking agent must be notified"

    def confirm():
        return "ok or reject" 

    print("session attached")

    await session.register(get_distance, 'com.conti.hackathon.team4.test')
    print("Procedure {} registered".format("com.conti.hackathon.team4.test"))


if __name__ == '__main__':
    run([display_component])
