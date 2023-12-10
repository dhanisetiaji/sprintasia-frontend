import { Container } from '@mui/material';
import CustomBreadcrumbs from '../custom-breadcrumbs/CustomBreadcrumbs';
import TaskTable from './Table';

export default function TaskListDoneSection() {
  return (
    <Container>
      <CustomBreadcrumbs
        heading="Example Apps"
        links={[
          {
            name: 'Done Task List',
            href: '/done',
          },
        ]}
      />
      <TaskTable status="done" />
    </Container>
  );
}
