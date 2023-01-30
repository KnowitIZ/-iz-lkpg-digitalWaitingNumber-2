namespace API.Data
{
    public class WaitingNumberDto
    {
        public int Id { get; set; }
        public string? CreatedById { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Status { get; set; }
        public string? ServedById { get; set; }
        public string? ServedBy { get; set; }
        public string? RefNbr { get; set; }
    }
}
