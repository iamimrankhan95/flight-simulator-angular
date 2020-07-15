export class Constants {
    public static readonly maxFileSize = 10 * 1024 * 1024; // ten MB
    public static readonly maritalStatus = [
        { value: 'married', name: 'Married' },
        { value: 'unmarried', name: 'Unmarried' },
        { value: 'divorced', name: 'Divorced' },
    ];
    public static readonly gender = [
        { id: 1, name: 'Male' },
        { id: 2, name: 'Female' },
        { id: 3, name: 'Other' },
    ];
}
