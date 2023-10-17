# Zoom-Breakout

Create Zoom Breakout Rooms automagically

## Configuration

1. Copy `config.json.example` to `config.json`
2. Adjust the parameters as needed, especially the `meetingId`, `meetingPassword` and `hostKey` values

## Launch

At the time of writing, this package needs at least [nodejs](https://nodejs.org/) v16

To execute the creation of the breakout rooms, simply run these commands:

```bash
npm install
npx playwright install
npm run breakout
```

Alternatively you can run `npm run breakout:headed` to see what actions the scripts perform or use `npm run breakout:dryrun` to output which rooms would be created.

## Disclaimer
THIS SOFTWARE IS PROVIDED "AS IS" AND ANY EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
