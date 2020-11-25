import { createEntity } from "metabase/lib/entities";
import { AdminChecklistSchema } from "metabase/schema";

const AdminChecklist = createEntity({
  name: "adminChecklist",
  path: "/api/setup/admin_checklist",
  schema: AdminChecklistSchema,
});

export default AdminChecklist;
