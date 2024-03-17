import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: theme.breakpoints.values.lg,
    margin: 'auto',
    padding: theme.spacing(2),
	marginTop:'5%'
  },
  header: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  addButton: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  filterButtons: {
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  listItem: {
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  listItemText: {
    flex: '1 1 auto',
  },
  actionButtons: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
	gap:'10px',
    marginLeft: theme.spacing(1),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    flexWrap: 'wrap',
  },
  paginationButton: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    cursor: 'pointer',
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '50%',
    backgroundColor: 'transparent',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  disabledPaginationButton: {
    color: theme.palette.text.disabled,
    cursor: 'default',
  },
  breakPagination: {
    margin: theme.spacing(1),
  },
}));
