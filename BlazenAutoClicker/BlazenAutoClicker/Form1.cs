using CefSharp;
using CefSharp.WinForms;
using System;
using System.IO;
using System.Windows.Forms;

namespace BlazenAutoClicker
{
    public partial class Form1 : Form
    {
        public ChromiumWebBrowser chromeBrowser;

        public bool startMining;
        public Form1()
        {
            InitializeComponent();

            InitializeChromium();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void InitializeChromium()
        {
            CefSettings settings = new CefSettings();

            Cef.Initialize(settings);
            chromeBrowser = new ChromiumWebBrowser("http://www.blazoncommunity.com/Webwork/User/UserPanel.php?Login=Yes");
            //chromeBrowser = new ChromiumWebBrowser("https://www.google.bg/");

            this.pContainer.Controls.Add(chromeBrowser);

            chromeBrowser.Dock = DockStyle.Fill;

            chromeBrowser.FrameLoadStart += (o, e) => chromeBrowser.SetZoomLevel(-2.8);

            //Wait for the page to finish loading (all resources will have been loaded, rendering is likely still happening)
            //chromeBrowser.LoadingStateChanged += (sender, args) =>
            //{
            //    //Wait for the Page to finish loading
            //    if (args.IsLoading == false)
            //    {
            //        chromeBrowser.ExecuteScriptAsync("alert('All Resources Have Loaded');");
            //    }
            //};

            //Wait for the MainFrame to finish loading
            chromeBrowser.FrameLoadEnd += (sender, args) =>
            {
                //Wait for the MainFrame to finish loading
                if (this.startMining && args.Frame.IsMain)
                {
                    string script = getJavaScript();
                    args.Frame.ExecuteJavaScriptAsync(script);
                }
            };
        }

        private string getJavaScript()
        {
            string path = string.Format(@"{0}\HTMLResources\js\script-no-bonus.js", Application.StartupPath);
            //string path = string.Format(@"{0}\HTMLResources\js\script-bonus.js", Application.StartupPath);
            string script = File.ReadAllText(path);

            //chromeBrowser.ShowDevTools();
            return script;
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            Cef.Shutdown();
        }

        private void btnStart_Click(object sender, EventArgs e)
        {
            if (!this.startMining)
            {
                this.btnStart.Text = "Stop Mining";
                this.startMining = true;

                string script = getJavaScript();
                chromeBrowser.ExecuteScriptAsync(script);
            }
            else
            {
                this.btnStart.Text = "Start Mining";
                this.startMining = false;
            }
        }

        private void btn_refresh_Click(object sender, EventArgs e)
        {
            chromeBrowser.Reload();
        }
    }
}
