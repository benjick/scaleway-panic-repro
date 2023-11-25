import * as pulumi from "@pulumi/pulumi";
import * as scaleway from '@lbrlabs/pulumi-scaleway'

const project = new scaleway.AccountProject('project', {
});

const instance = new scaleway.DatabaseInstance(
  "postgres",
  {
    nodeType: "DB-DEV-S",
    engine: "PostgreSQL-15",
    isHaCluster: true,
    disableBackup: false,
    userName: "admin",
    password: "Foobar123!",
    projectId: project.id,
    volumeSizeInGb: 10,
    volumeType: "bssd",
  },
);

const database = new scaleway.Database(
  "db",
  {
    instanceId: instance.id,
    name: "merlin",
  },
);


const dbUser = new scaleway.DatabaseUser("db-user", {
  instanceId: instance.id,
  name: "merlin",
  password: "Foobar123!",
  isAdmin: false,
});

const dbUserPrivilege = new scaleway.DatabasePrivilege("db-user-privilege", {
  instanceId: instance.id,
  userName: dbUser.name,
  databaseName: database.name,
  permission: "all",
});
