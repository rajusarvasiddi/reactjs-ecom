const ProfileTab = () => {
  return (
    <>
      Personal Information Field Type Notes <br />
      First Name Text Required Last <br />
      Name Text Required <br />
      Email Email Read-only (usually tied to login) <br />
      Phone Number Text Optional — format with country code (+1, +91 etc.){" "}
      <br />
      Date of Birth Date Picker Optional <br />
      Gender Select (Male / Female / Other) Optional <br />
      Profile Picture File Upload (Avatar) Optional <br />
      Notification Preferences Select (Email / SMS / Push)
    </>
  );
};
export default ProfileTab;
