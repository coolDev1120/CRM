// material
import { Container, Grid, Stack, Box, Card, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// hooks
// eslint-disable-next-line camelcase
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import ColorLensIcon from '@mui/icons-material/ColorLens';

// eslint-disable-next-line import/no-duplicates
import useSettings from '../../hooks/useSettings';
// material
// components
import Page from '../../components/Page';
import DataTable from 'src/components/DataTable';
import CalendarEvent from 'src/components/Calendar'
import Description from 'src/components/Description';
import CardProject from 'src/components/CardProject'
import BankingBalanceStatistics from 'src/components/_dashboard/general-banking/BankingBalanceStatistics'

// ----------------------------------------------------------------------


export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;

  const events = [
    {
      calendar: <CalendarEvent />,
      description: (
        <Description
          title="Zoom call - Martin"
          subTitle="Notes about the call"
        />
      ),
      action: (
        <Button variant="contained">
          Email
        </Button>
      ),
    },
    {
      calendar: <CalendarEvent />,
      description: (
        <Description
          title="Zoom call - Martin"
          subTitle="Notes about the call"
        />
      ),
      action: (
        <Button variant="contained">
          Email
        </Button>
      ),
    },
    {
      calendar: <CalendarEvent />,
      description: (
        <Description
          title="Zoom call - Martin"
          subTitle="Notes about the call"
        />
      ),
      action: (
        <Button variant="contained">
          Email
        </Button>
      ),
    },
    {
      calendar: <CalendarEvent />,
      description: (
        <Description
          title="Zoom call - Martin"
          subTitle="Notes about the call"
        />
      ),
      action: (
        <Button variant="contained">
          Email
        </Button>
      ),
    },
  ];

  const projects = [
    {
      1: <b>Project Names</b>,
      2: <b>Number of Jobs</b>,
      3: <b>Total Value</b>,
    },
    { 1: <b>The Uorkshire Resin Company</b>, 2: 2, 3: 1899 },
    { 1: <b>Build a drive</b>, 2: 5, 3: 2300 },
    { 1: <b>Power Clean</b>, 2: 8, 3: 3500 },
  ];

  const tasks = [
    {
      description: (
        <Description
          title="Resin Bound vs Resin Bonded"
          subTitle="Nov 19, 2022 for Martin"
        />
      ),
      action: (
        <Button variant="contained">
          Progressing
        </Button>
      ),
    },
    {
      description: (
        <Description
          title="Resin Bound Specification"
          subTitle="Nov 19, 2022 for Martin"
        />
      ),
      action: (
        <Button variant="contained" color="success">
          Success
        </Button>
      ),
    },
    {
      description: (
        <Description title="Maintenance" subTitle="Nov 19, 2022 for Martin" />
      ),
      action: (
        <Button variant="contained" color="error">
          Failed
        </Button>
      ),
    },
    {
      description: (
        <Description
          title="Artificial Grass"
          subTitle="Nov 19, 2022 for Martin"
        />
      ),
      action: (
        <Button variant="contained" color="warning">
          Progressing
        </Button>
      ),
    },
  ];

  const runningProjects = [
    {
      1: <b>Names</b>,
      2: <b>No of sales</b>,
      3: <b>Total Value</b>,
    },
    { 1: <b>Martin</b>, 2: 5, 3: 5000 },
    { 1: <b>Jesper</b>, 2: 8, 3: 1000 },
    { 1: <b>David</b>, 2: 2, 3: 1400 },
    { 1: <b>Shaun</b>, 2: 10, 3: 4500 },
    { 1: <b>Jimmy</b>, 2: 34, 3: 2900 },
  ];
  const jobs = [
    {
      1: <b>Works Type</b>,
      2: <b>Number of Jobs</b>,
      3: <b>Total Value</b>,
    },
    { 1: <b>The Yorkshire Resin Company</b>, 2: 2, 3: 1899 },
    { 1: <b>Build a Drive</b>, 2: 8, 3: 2300 },
    { 1: <b>Power Clean</b>, 2: 2, 3: 1899 },
  ];

  const notices = [
    {
      1: <b>Notice</b>,
      2: <b>Published By</b>,
      3: <b>Date Added</b>,
    },
    { 1: <b>New notice</b>, 2: "Martin", 3: "Dec 25, 2022" },
    { 1: <b>New notice</b>, 2: "Martin", 3: "Dec 25, 2022" },
    { 1: <b>New notice</b>, 2: "Martin", 3: "Dec 25, 2022" },
    { 1: <b>New notice</b>, 2: "Martin", 3: "Dec 25, 2022" },
    { 1: <b>New notice</b>, 2: "Martin", 3: "Dec 25, 2022" },
  ];

  return (
    <>
      <Box sx={{ mx: '-15px', py: '15px', px: '20px', mt: '-24px', mb: '20px', borderBottom: '1px solid', borderColor: '#c3c3c3', background: '#eee' }}>
        <div style={{ display: 'flex' }}>
          <ColorLensIcon sx={{ fontSize: '58px', mx: '15px', color: PRIMARY_MAIN}} />
          <div>
            <Typography
              color={PRIMARY_MAIN}
              sx={{
                fontSize: '23px',
                fontWeight: 'bold',
              }}>
              The YorkShire Resin Company
            </Typography>
            <Typography
              color="text.primary"
              sx={{
                fontSize: '15px',
              }}>
              Very detailed & featured admin.
            </Typography>
          </div>
        </div>
      </Box>
      <Page title="The Yorkshire Resin Company Ltd">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container spacing={3}>
            <Grid item lg={3} md={6} xs={12}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3, color: '#fff', background: PRIMARY_MAIN }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <PersonAddAltRoundedIcon sx={{ fontSize: '70px' }} />
                  </Stack>
                  <Typography variant="subtitle2" sx={{ fontSize: '23px' }}>
                    Open Projects
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '35px', marginTop: '-43px' }} variant="subtitle2">
                  10
                </Typography>

              </Card>
            </Grid>

            <Grid item lg={3} md={6} xs={12}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3, background: PRIMARY_MAIN, color: '#fff' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <WorkOutlineRoundedIcon sx={{ fontSize: '70px' }} />
                  </Stack>

                  <Typography variant="subtitle2" sx={{ fontSize: '23px' }}>
                    All Won Jobs
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '35px', marginTop: '-43px' }} variant="subtitle2">
                  10
                </Typography>
              </Card>
            </Grid>

            <Grid item lg={3} md={6} xs={12}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3, background: PRIMARY_MAIN, color: '#fff' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <CreditCardRoundedIcon sx={{ fontSize: '70px' }} />
                  </Stack>

                  <Typography variant="subtitle2" sx={{ fontSize: '23px' }}>
                    New Leads
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '35px', marginTop: '-43px' }} variant="subtitle2">
                  10
                </Typography>
              </Card>
            </Grid>

            <Grid item lg={3} md={6} xs={12}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3, background: PRIMARY_MAIN, color: '#fff' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <ContentCopyRoundedIcon sx={{ fontSize: '70px' }} />
                  </Stack>

                  <Typography variant="subtitle2" sx={{ fontSize: '23px' }}>
                    Pending Tasks
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '35px', marginTop: '-43px' }} variant="subtitle2">
                  12
                </Typography>
              </Card>
            </Grid>

            <Grid item lg={6} xs={12}>
              <CardProject title="Upcoming Events">
                <DataTable rows={events} />
              </CardProject>
            </Grid>

            <Grid item lg={6} xs={12}>
              <CardProject title="Running Projects">
                <DataTable rows={projects} />
              </CardProject>
            </Grid>

            <Grid item lg={6} xs={12}>
              <CardProject title="Pending Tasks">
                <DataTable rows={tasks} />
              </CardProject>
            </Grid>

            <Grid item lg={6} xs={12}>
              <CardProject title="Running Projects">
                <DataTable rows={runningProjects} />
              </CardProject>
            </Grid>

            <Grid item lg={6} xs={12}>
              <CardProject title="Won Jobs">
                <DataTable rows={jobs} />
              </CardProject>
            </Grid>

            <Grid item lg={6} xs={12}>
              <CardProject title="Notice Board">
                <DataTable rows={notices} />
              </CardProject>
            </Grid>

            <Grid item lg={12} xs={12}>
              <CardProject title="This years sales compared to last years" full>
                <BankingBalanceStatistics />
              </CardProject>
            </Grid>

          </Grid>
        </Container>
      </Page>
    </>
  );
}
