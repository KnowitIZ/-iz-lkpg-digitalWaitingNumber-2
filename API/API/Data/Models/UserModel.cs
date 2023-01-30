namespace API.Data
{
    public class UserModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
        public List<string> Roles { get; set; }
    }
}
