import WorkIcon from "@mui/icons-material/Work";
import GroupsIcon from "@mui/icons-material/Groups";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PhotoSizeSelectLargeOutlinedIcon from "@mui/icons-material/PhotoSizeSelectLargeOutlined";
import EmojiTransportationOutlinedIcon from "@mui/icons-material/EmojiTransportationOutlined";
import LightbulbCircleOutlinedIcon from "@mui/icons-material/LightbulbCircleOutlined";

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      {
        title: 'dashboard',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
      {
        title: 'matrials',
        path: PATH_DASHBOARD.user.profile,
        icon: <LayersOutlinedIcon />
      },
      {
        title: 'jobs',
        path: PATH_DASHBOARD.user.profile,
        icon: <WorkIcon />
      },
      {
        title: "Enquiries",
        path: PATH_DASHBOARD.user.profile,
        icon: <QuestionAnswerOutlinedIcon />,
      },
      {
        title: "Maps",
        path: PATH_DASHBOARD.user.profile,
        icon: <LocationOnIcon />,
      },
      {
        title: "Finance",
        path: PATH_DASHBOARD.user.profile,
        icon: <MonetizationOnIcon />,
      },
      {
        title: "Calendar",
        path: PATH_DASHBOARD.user.profile,
        icon: ICONS.calendar
      },
      {
        title: "Documents",
        path: PATH_DASHBOARD.user.profile,
        icon: <DescriptionOutlinedIcon />,
      },
      {
        title: "Snagging",
        path: PATH_DASHBOARD.user.profile,
        icon: <LightbulbCircleOutlinedIcon />,
      },
      {
        title: "Annual Power",
        path: PATH_DASHBOARD.user.profile,
        icon: <CalendarTodayOutlinedIcon />,
      },
      {
        title: "Assets Management",
        path: PATH_DASHBOARD.user.profile,
        icon: <EmojiTransportationOutlinedIcon />,
      },
      {
        title: "Staff",
        path: PATH_DASHBOARD.user.profile,
        icon: <GroupsIcon />,
      },
      {
        title: "Template",
        path: PATH_DASHBOARD.user.profile,
        icon: <PhotoSizeSelectLargeOutlinedIcon />,
      },
      // { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
      // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking }
    ]
  },

  
];

export default sidebarConfig;
