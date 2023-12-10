import { Container } from '@mui/material';
import CustomBreadcrumbs from '../custom-breadcrumbs/CustomBreadcrumbs';
import TaskTable from './Table';

export default function TaskListOnGoingSection() {
  return (
    <Container>
      <CustomBreadcrumbs
        heading="Example Apps"
        links={[
          {
            name: 'Ongoing Task List',
            href: '/',
          },
        ]}
      />
      <TaskTable status="ongoing" />
    </Container>
  );
}
