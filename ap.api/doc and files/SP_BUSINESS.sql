USE [bsDB]
GO
/****** Object:  StoredProcedure [dbo].[SP_BUSINESS]    Script Date: 1/5/2025 4:37:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[SP_BUSINESS]
    @Action VARCHAR(10),
    @Id NVARCHAR(50) = NULL,
    @BusinessName NVARCHAR(50) = NULL,
    @ShortName NVARCHAR(50) = NULL,
    @OfficeAddress NVARCHAR(50) = NULL,
    @ContactName NVARCHAR(50) = NULL,
    @ContactNo NVARCHAR(50) = NULL,
    @EmailAddress NVARCHAR(50) = NULL,
    @BIN NVARCHAR(50) = NULL,
    @TaxVATNo NVARCHAR(50) = NULL,
    @BusinessLogo NVARCHAR(50) = NULL,
    @CountryId NVARCHAR(50) = NULL,
    @CurrencyId NVARCHAR(50) = NULL,
    @MaxEmployee INT = NULL,
    @MaxSalary INT = NULL,
    @IsActive BIT = NULL,
    @UserId NVARCHAR(50) = NULL,
    @P_SUCCESS BIT OUTPUT,
    @P_MSG VARCHAR(255) OUTPUT

AS
BEGIN

    SET NOCOUNT ON;

    BEGIN TRY					
		SET @P_SUCCESS = CAST(0 AS BIT);
        IF @Action = 'INSERT'
        BEGIN
			 IF @BusinessName IS NULL OR LEN(@BusinessName) = 0
            BEGIN
                SET @P_MSG = 'Business name is required.';
                RETURN;
            END

            INSERT INTO [dbo].[BUSINESS] (
                [ID],
                [BUSINESS_NAME],
                [SHORT_NAME],
                [OFFICE_ADDRESS],
                [CONTACT_NAME],
                [CONTACT_NO],
                [EMAIL_ADDRESS],
                [BIN],
                [TAX_VAT_NO],
                [BUSINESS_LOGO],
                [COUNTRY_ID],
                [CURRENCY_ID],
                [MAX_EMPLOYEE],
                [MAX_SALARY],
                [IS_ACTIVE],
                [CREATE_USER],
                [CREATE_DATE],
                [UPDATE_USER],
                [UPDATE_DATE],
                [REVISE_NO]
            )
            VALUES (
                NEWID(),
                @BusinessName,
                @ShortName,
                @OfficeAddress,
                @ContactName,
                @ContactNo,
                @EmailAddress,
                @BIN,
                @TaxVATNo,
                @BusinessLogo,
                @CountryId,
                @CurrencyId,
                @MaxEmployee,
                @MaxSalary,
                1, --Default Active
                @UserId,
                GETDATE(),
                NULL,
                GETDATE(),
                1
            );

            SET @P_SUCCESS = CAST(1 AS BIT);
            SET @P_MSG = 'Record inserted successfully.';

        END
        ELSE IF @Action = 'UPDATE'
        BEGIN
			IF @Id IS NULL OR LEN(@Id) = 0
            BEGIN
                SET @P_MSG = 'Id is required for updating.';
                RETURN;
            END

            UPDATE [dbo].[BUSINESS]
            SET
                [BUSINESS_NAME] = @BusinessName,
                [SHORT_NAME] = @ShortName,
                [OFFICE_ADDRESS] = @OfficeAddress,
                [CONTACT_NAME] = @ContactName,
                [CONTACT_NO] = @ContactNo,
                [EMAIL_ADDRESS] = @EmailAddress,
                [BIN] = @BIN,
                [TAX_VAT_NO] = @TaxVATNo,
                [BUSINESS_LOGO] = @BusinessLogo,
                [COUNTRY_ID] = @CountryId,
                [CURRENCY_ID] = @CurrencyId,
                [MAX_EMPLOYEE] = @MaxEmployee,
                [MAX_SALARY] = @MaxSalary,
                [IS_ACTIVE] = @IsActive,
                [UPDATE_USER] = @UserId,
                [UPDATE_DATE] = GETDATE(),
                [REVISE_NO] = REVISE_NO + 1
            WHERE
                [ID] = @Id;

            SET @P_SUCCESS = CAST(1 AS BIT);
            SET @P_MSG = 'Record updated successfully.';

        END
        ELSE IF @Action = 'GETBYID'
        BEGIN
			IF @Id IS NULL OR LEN(@Id) = 0
            BEGIN
                SET @P_MSG = 'Id is required for fetching the record.';
                RETURN;
            END

            SELECT
                [ID] AS Id,
                [BUSINESS_NAME] AS BusinessName,
                [SHORT_NAME] AS ShortName,
                [OFFICE_ADDRESS] AS OfficeAddress,
                [CONTACT_NAME] AS ContactName,
                [CONTACT_NO] AS ContactNo,
                [EMAIL_ADDRESS] AS EmailAddress,
                [BIN] AS BIN,
                [TAX_VAT_NO] AS TaxVATNo,
                [BUSINESS_LOGO] AS BusinessLogo,
                [COUNTRY_ID] AS CountryId,
                [CURRENCY_ID] AS CurrencyId,
                [MAX_EMPLOYEE] AS MaxEmployee,
                [MAX_SALARY] AS MaxSalary,
                [IS_ACTIVE] AS IsActive,
                [CREATE_USER] AS CreatedBy,
                [CREATE_DATE] AS CreatedOn,
                [UPDATE_USER] AS UpdatedBy,
                [UPDATE_DATE] AS UpdatedOn,
                [REVISE_NO] AS RevisionNumber
            FROM
                [dbo].[BUSINESS]
            WHERE
                [ID] = @Id;

            -- For SELECT, @P_MSG can indicate the number of rows returned
            SET @P_SUCCESS = CAST(1 AS BIT);
            SET @P_MSG = CAST(@@ROWCOUNT AS VARCHAR(10)) + ' rows returned.';

        END
        ELSE IF @Action = 'GETALL'
        BEGIN

            SELECT
                [ID] AS Id,
                [BUSINESS_NAME] AS BusinessName,
                [SHORT_NAME] AS ShortName,
                [OFFICE_ADDRESS] AS OfficeAddress,
                [CONTACT_NAME] AS ContactName,
                [CONTACT_NO] AS ContactNo,
                [EMAIL_ADDRESS] AS EmailAddress,
                [BIN] AS BIN,
                [TAX_VAT_NO] AS TaxVATNo,
                [BUSINESS_LOGO] AS BusinessLogo,
                [COUNTRY_ID] AS CountryId,
                [CURRENCY_ID] AS CurrencyId,
                [MAX_EMPLOYEE] AS MaxEmployee,
                [MAX_SALARY] AS MaxSalary,
                [IS_ACTIVE] AS IsActive,
                [CREATE_USER] AS CreatedBy,
                [CREATE_DATE] AS CreatedOn,
                [UPDATE_USER] AS UpdatedBy,
                [UPDATE_DATE] AS UpdatedOn,
                [REVISE_NO] AS RevisionNumber
            FROM
                [dbo].[BUSINESS];

            -- For SELECT, @P_MSG can indicate the number of rows returned
            SET @P_SUCCESS = CAST(1 AS BIT);
            SET @P_MSG = CAST(@@ROWCOUNT AS VARCHAR(10)) + ' rows returned.';

        END
        ELSE IF @Action = 'DELETE'
        BEGIN
			IF @Id IS NULL OR LEN(@Id) = 0
            BEGIN
                SET @P_MSG = 'Id is required for deleting the record.';
                RETURN;
            END

            DELETE
            FROM
                [dbo].[BUSINESS]
            WHERE
                [ID] = @Id;

            -- For SELECT, @P_MSG can indicate the number of rows returned
            SET @P_SUCCESS = CAST(1 AS BIT);
            SET @P_MSG = CAST(@@ROWCOUNT AS VARCHAR(10)) + ' rows returned.';

        END
        ELSE
        BEGIN
		
            SET @P_SUCCESS = CAST(0 AS BIT);
            SET @P_MSG = 'Invalid action specified.';
        END

    END TRY
    BEGIN CATCH
        SET @P_SUCCESS = CAST(0 AS BIT);
        SET @P_MSG = ERROR_MESSAGE();
    END CATCH

END;