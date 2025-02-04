package utils

import (
    "net/http"
    "MY_API/model"  
    "fmt"
    "time"

    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("12345123")

func CreateToken(user *model.User) (string, error) {
    claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "id":    user.ID,
        "email": user.Email,
        "admin": user.Admin,
        "expiration": time.Now().Add(time.Hour).Unix(),
    })

    tokenString, err := claims.SignedString(secretKey)
    if err != nil {
        return "", err
    }
    fmt.Println(tokenString)
    return tokenString, nil
}

func AuthenticateMiddleware(c *gin.Context) {
    tokenString, err := c.Cookie("token")
    if err != nil {
        fmt.Println("Pas de token dans le cookie")
        c.Abort()
        return
    }

    token, err := VerifyToken(tokenString)
    if err != nil {
        fmt.Printf("Token verification failed: %v\n", err)
        c.Abort()
        return
    }

    fmt.Printf("Token verified successfully. Claims: %+v\n", token.Claims)
    
   
}


func AdminMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        
        user, err := Claims(c)
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Utilisateur non authentifié"})
            c.Abort()
            return
        }

        
        if !user.Admin {
            c.JSON(http.StatusForbidden, gin.H{"error": "Accès refusé : vous n'êtes pas administrateur"})
            c.Abort()
            return
        }

        
        c.Set("userAdmin", true)
        c.Next()
    }
}

func VerifyToken(tokenString string) (*jwt.Token, error) {
    token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        return secretKey, nil
    })

    if err != nil {
        return nil, err
    }

    if !token.Valid {
        return nil, fmt.Errorf("invalid token")
    }

    return token, nil
}

func Claims(c *gin.Context) (*model.User, error) {
    tokenString, err := c.Cookie("token")
    if err != nil {
        fmt.Println("Aucun token dans le cookie")
        c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
        return nil, err
    }

    token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("pas de token correct: %v", token.Header["alg"])
        }
        return secretKey, nil
    })
    if err != nil {
        fmt.Printf("Parsing du token mauvais: %v\n", err)
        c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Mauvais token"})
        return nil, err
    }

    claims, ok := token.Claims.(jwt.MapClaims)
    if !ok || !token.Valid {
        fmt.Println("Claim fail")
        c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Claim fail"})
        return nil, fmt.Errorf("claim fail")
    }

    id, ok := claims["id"].(float64)
    if !ok {
        return nil, fmt.Errorf("id invalide ou manquant")
    }
    email, ok := claims["email"].(string)
    if !ok {
        return nil, fmt.Errorf("email invalide ou manquant")
    }
    role, ok := claims["admin"].(bool)
    if !ok {
        return nil, fmt.Errorf("admin invalide ou manquant")
    }

    user := &model.User{
        ID:    int(id),
        Email: email,
        Admin: role,
    }

    fmt.Println(user)
    return user, nil
}
