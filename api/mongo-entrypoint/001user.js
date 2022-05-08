db.createUser({
  user: 'admin',
  pwd: 'admin',
  roles: [
    {
      role: 'readWrite',
      db: 'food_app_crm',
    },
  ],
});
